import axios from "axios";

interface GitHubProfile {
    avatar_url: string;
    bio: string | null;
    login: string;
    name: string | null;
    followers: number;
    following: number;
}

interface GitHubRepo {
    fork: boolean;
    stargazers_count: number;
    languages?: {
        edges?: Array<{
            size: number;
            node: { name: string };
        }> | null;
    } | null;
}

interface ContributionDay {
    date: string;
    contributionCount: number;
}

interface GitHubUserData {
    repositories: {
        totalCount: number;
        nodes: GitHubRepo[];
    };
    contributionsCollection: {
        contributionCalendar: {
            weeks: Array<{ contributionDays: ContributionDay[] }>;
        };
    };
}

interface GitHubGraphQLResponse {
    data: {
        user: GitHubUserData | null;
    };
}

class HttpError extends Error {
    constructor(public readonly status: number, message: string) {
        super(message);
    }
}

const buildQuery = (login: string) => ({
    query: `query($login: String!) {
        user(login: $login) {
            contributionsCollection {
                contributionCalendar {
                    weeks {
                        contributionDays {
                            date
                            contributionCount
                        }
                    }
                }
            }
            repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
                totalCount
                nodes {
                    languages(first: 100, orderBy: {field: SIZE, direction: DESC}) {
                        edges {
                            size
                            node { name }
                        }
                    }
                }
            }
        }
    }`,
    variables: { login }
});

const NON_LANG_TYPES = new Set(["CSS", "HTML", "SCSS", "Sass", "Less", "EJS", "Pug", "Handlebars"]);

const parseLangs = (repoNodes: GitHubRepo[]): Array<[string, number]> => {
    const langCount: Record<string, number> = {};
    repoNodes.forEach(repo => {
        if (!repo.languages || !repo.languages.edges) return;
        repo.languages.edges.forEach(edge => {
            const lang = edge.node.name;
            if (NON_LANG_TYPES.has(lang)) return;
            langCount[lang] = (langCount[lang] || 0) + edge.size;
        });
    });
    return Object.entries(langCount).sort((a, b) => b[1] - a[1]).slice(0, 4);
};

function getLevel(count: number): string {
    if (count == 0) return "off";
    if (count >= 1 && count <= 2) return "dim";
    if (count >= 3 && count <= 5) return "mid";
    if (count >= 6) return "bright";
    return "off";
}

async function fetchGitHubData(username: string) {
    const headers = { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` };

    try {
        const [profileRes, repoData, graphQL] = await Promise.all([
            axios.get<GitHubProfile>(`https://api.github.com/users/${username}`, { headers }),
            axios.get<GitHubRepo[]>(`https://api.github.com/users/${username}/repos?per_page=100`, { headers }),
            axios.post<GitHubGraphQLResponse>("https://api.github.com/graphql", buildQuery(username), { headers }),
        ]);

        const { avatar_url, bio, login, name, followers, following } = profileRes.data;
        const starsCount: number[] = [];
        repoData.data.forEach((repo) => {
            if(!repo.fork) starsCount.push(repo.stargazers_count);

        });
        const totalStars = starsCount.reduce((sum, stars) => sum + stars, 0);
        const forkCount = repoData.data.filter(r => r.fork).length;

        const userData = graphQL.data.data.user;

        if (!userData) {
            throw new HttpError(404, `GitHub user "${username}" not found.`);
        }

        const topLangs = parseLangs(userData.repositories.nodes);
        const weeks = userData.contributionsCollection.contributionCalendar.weeks;
        const coloredWeeks = weeks.map(week => ({
            days: week.contributionDays.map(day => ({
                date: day.date,
                count: day.contributionCount,
                level: getLevel(day.contributionCount)
            }))
        }));
      
        return {
            login,
            name,
            avatar_url,
            bio,
            followers,
            following,
            public_repo_count: userData.repositories.totalCount, // from the totalCount fix, non-fork
            fork_count: forkCount,
            topLangs,
            totalStars,
            coloredWeeks,
        };
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            const status = err.response.status;
            if (status === 404) throw new HttpError(404, `GitHub user "${username}" not found.`);
            if (status === 401) throw new HttpError(502, "GitHub API authentication failed. Please verify your token.");
            if (status === 403) throw new HttpError(503, "GitHub API rate limit exceeded or access denied.");
        }
        throw err;
    }
}

export {fetchGitHubData}
export type Stats = Awaited<ReturnType<typeof fetchGitHubData>>