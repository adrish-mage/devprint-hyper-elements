# DevPrint Elements

One GitHub profile, four outputs: email, web page, PDF and PNG card, all rendered from a single [Hyper Elements](https://github.com/hyper-elements/hyper-elements) template.

> Entry for the Hyper Elements Template Challenge. #HyperElementsTemplate

## Status
Work in progress.

## How Hyper Elements is used
_TODO: shared components, one theme, four roots (Email, Page, Document, Canvas), validate/outline workflow._

## Screenshots
_TODO: email, page, PDF, PNG._

## Run it
```bash
npm install
npx tsx src/render.tsx
```
Output is written to `out/`.

To fetch live data, set `GITHUB_TOKEN` in a `.env` file and run `npx tsx src/dump.ts <username>`.