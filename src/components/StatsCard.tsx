import { Column, Row, Heading, Text, Image, Span } from "@hyper-elements/react";
import type { Stats } from "../data.js";

export function StatsCard({ stats }: { stats: Stats }) {
    return (
        <Column style={{ padding: 24, gap: 8 }}>
            <Heading level={1}>{stats.name ?? stats.login}</Heading>
            <Text>Login: {stats.login}</Text>
            {stats.bio && <Text>{stats.bio}</Text>}
            <Image
                src={{ src: stats.avatar_url, width: 200, height: 200 }}
                alt={stats.login}
            />
            <Text>
                Followers: {stats.followers}
            </Text>
            <Text>
                Following: {stats.following}
            </Text>
            <Text>
                Stars: {stats.totalStars}
            </Text>
            <Text>
                Repositories : {stats.public_repo_count}
            </Text><Text>
                Forks: {stats.fork_count}
            </Text>
            <Column style={{ padding: 24, gap: 8 }}>
                {stats.topLangs.map(([lang, size]) => (
                    <Text key={lang}>{lang}: {size}</Text>
                ))}
            </Column>


        </Column>
    );
}