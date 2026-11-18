import { Column, Row, Heading, Text, Image, token } from "@hyper-elements/react";
import type { Stats } from "../data.js";

export function StatsCard({ stats }: { stats: Stats }) {
    return (
        <Column style={{ padding: 24, gap: 8 }}>
            <Row style={{ gap: 16, alignItems: "center" }}>
                <Image
                    src={{ src: `${stats.avatar_url}&s=200`, width: 200, height: 200 }}
                    alt={stats.login}
                    style={{ width: 80, borderRadius: 40 }}
                />
                <Column style={{ gap: 4 }}>
                    <Heading level={1}>{stats.name ?? stats.login}</Heading>
                    <Text style={{ color: token("colors.muted") }}>@{stats.login}</Text>
                    {stats.bio && <Text>{stats.bio}</Text>}
                </Column>
            </Row>

            <Text>Followers: {stats.followers}</Text>
            <Text>Following: {stats.following}</Text>
            <Text>Stars: {stats.totalStars}</Text>
            <Text>Repositories: {stats.public_repo_count}</Text>
            <Text>Forks: {stats.fork_count}</Text>

            <Column style={{ padding: 24, gap: 4 }}>
                {stats.topLangs.map(([lang, size]) => (
                    <Text key={lang}>{lang}: {size}</Text>
                ))}
            </Column>
        </Column>
    );
}