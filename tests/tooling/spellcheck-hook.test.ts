import { spawnSync } from "node:child_process";
import {
  cpSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";

// cspell:ignore mispeling -- intentional typo in the isolated hook fixture.
const projectRoot = fileURLToPath(new URL("../../", import.meta.url));

it("accepts clean text and blocks a misspelled Git commit through Husky", () => {
  const fixture = mkdtempSync(join(tmpdir(), "maya-spellcheck-hook-"));
  const run = (command: string, args: string[]) =>
    spawnSync(command, args, {
      cwd: fixture,
      encoding: "utf8",
      env: { ...process.env, HUSKY: "1" },
      timeout: 20000,
    });
  const succeed = (command: string, args: string[]) => {
    const result = run(command, args);
    expect(result.error).toBeUndefined();
    expect(result.status, result.stdout + result.stderr).toBe(0);
    return result.stdout;
  };
  try {
    const pkg = JSON.parse(
      readFileSync(join(projectRoot, "package.json"), "utf8"),
    ) as {
      scripts: { spellcheck: string };
    };
    writeFileSync(
      join(fixture, "package.json"),
      JSON.stringify({
        private: true,
        scripts: { spellcheck: pkg.scripts.spellcheck },
      }),
    );
    cpSync(join(projectRoot, "cspell.json"), join(fixture, "cspell.json"));
    cpSync(join(projectRoot, ".cspell"), join(fixture, ".cspell"), {
      recursive: true,
    });
    symlinkSync(
      join(projectRoot, "node_modules"),
      join(fixture, "node_modules"),
      "dir",
    );
    mkdirSync(join(fixture, ".husky"));
    cpSync(
      join(projectRoot, ".husky/pre-commit"),
      join(fixture, ".husky/pre-commit"),
    );
    succeed("git", ["init", "--quiet"]);
    succeed(process.execPath, [join(projectRoot, "node_modules/husky/bin.js")]);
    const identity = [
      "-c",
      "user.name=Spellcheck Test",
      "-c",
      "user.email=spellcheck@example.test",
      "-c",
      "commit.gpgsign=false",
    ];
    writeFileSync(
      join(fixture, "README.md"),
      "A personal blog about code and projects.\n",
    );
    succeed("git", ["add", "README.md"]);
    succeed("git", [...identity, "commit", "-m", "docs: clean spelling"]);
    const head = succeed("git", ["rev-parse", "HEAD"]);
    writeFileSync(
      join(fixture, "README.md"),
      "A personal blog with mispeling.\n",
    );
    succeed("git", ["add", "README.md"]);
    const rejected = run("git", [
      ...identity,
      "commit",
      "-m",
      "docs: deliberate typo",
    ]);
    expect(rejected.status, rejected.stdout + rejected.stderr).toBe(1);
    expect(rejected.stdout + rejected.stderr).toContain("mispeling");
    expect(succeed("git", ["rev-parse", "HEAD"])).toBe(head);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
}, 30000);
