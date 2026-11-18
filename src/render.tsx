import { theme } from "./theme.js";
import { StatsCard } from "./components/StatsCard.js";
import type { Stats } from "./data.js";
import { readFile, writeFile, mkdir } from "node:fs/promises"
import { Email, Page, render, validate, outline } from "@hyper-elements/react";

const stats: Stats = JSON.parse(await readFile("fixtures/stats.json", "utf-8"));

const email = (
    <Email width={600} theme={theme}>
        <StatsCard stats={stats} />
    </Email>
);
const report = validate(email);
console.log(report.diagnostics);
if (report.valid) console.log(outline(email));

const { html: emailHtml } = await render(email);

const page = (
    <Page width={960} theme={theme}>
        <StatsCard stats={stats} />
    </Page>
);
const { html: pageHtml } = await render(page);

await mkdir("out", { recursive: true });
await writeFile("out/email.html", emailHtml);
await writeFile("out/page.html", pageHtml);