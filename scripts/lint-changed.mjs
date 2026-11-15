import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { ESLint } from "eslint";

const tracked = execFileSync(
  "git",
  ["diff", "HEAD", "--name-only", "--diff-filter=ACMR", "-z"],
  { encoding: "utf8" },
);
const untracked = execFileSync(
  "git",
  ["ls-files", "--others", "--exclude-standard", "-z"],
  { encoding: "utf8" },
);
const eslint = new ESLint();
const candidates = [...new Set((tracked + untracked).split("\0"))].filter(
  (file) => /\.[cm]?[jt]sx?$/.test(file) && existsSync(file),
);
const files = [];
for (const file of candidates)
  if (!(await eslint.isPathIgnored(file))) files.push(file);
if (files.length) {
  const results = await eslint.lintFiles(files);
  const formatter = await eslint.loadFormatter("stylish");
  process.stdout.write(formatter.format(results));
  if (results.some((result) => result.errorCount || result.warningCount))
    process.exitCode = 1;
} else console.log("No changed JavaScript or TypeScript files.");
