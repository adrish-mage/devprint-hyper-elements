import { Column, Grid, Row, Heading, Text, Image, token } from "@hyper-elements/react";
import type { Stats } from "../data.js";

export function StatsCard({ stats }: { stats: Stats }) {
    const statItems = [
        { label: "Followers", value: stats.followers },
        { label: "Following", value: stats.following },
        { label: "Stars", value: stats.totalStars },
        { label: "Repositories", value: stats.public_repo_count },
        { label: "Forks", value: stats.fork_count },
    ];
    const totalLangSize = stats.topLangs.reduce((total, [, size]) => total + size, 0);

    return (
        <Column style={{
            padding: 24,
            gap: 8,
            border: { width: 1, style: "solid", color: token("colors.border") },
            borderRadius: 12,
        }}>
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

            <Grid columns={3} style={{ gap: 12 }}>
                {statItems.map(({ label, value }) => (
                    <Column key={label} style={{ gap: 4 }}>
                        <Text style={{ fontSize: 20, fontWeight: 700 }}>{value}</Text>
                        <Text style={{ color: token("colors.muted") }}>{label}</Text>
                    </Column>
                ))}
            </Grid>

            <Column style={{ padding: 24, gap: 4 }}>
                {stats.topLangs.map(([lang, size]) => (
                    <Text key={lang}>
                        {lang} {totalLangSize === 0 ? 0 : Math.round((size / totalLangSize) * 100)}%
                    </Text>
                ))}
            </Column>
        </Column>
    );
}