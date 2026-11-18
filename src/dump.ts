import "dotenv/config"
import { fetchGitHubData } from "./data.js"
import { mkdirSync, writeFileSync } from "node:fs";

const username = process.argv[2] || "adrish-mage";
const data = await fetchGitHubData(`${username}`);


mkdirSync("fixtures", { recursive: true });

writeFileSync(
  "fixtures/stats.json",
  JSON.stringify(data, null, 2)
);

console.log(`GitHub stats for ${username} saved to fixtures/stats.json`);