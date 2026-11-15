import { createRequire } from "node:module";
import { resolve } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { compileMdx } from "nextra/compile";
import { evaluate } from "nextra/evaluate";
import { afterEach, describe, expect, it, vi } from "vitest";

const projectRequire = createRequire(import.meta.url);
const nextRequire = createRequire(projectRequire.resolve("eslint-config-next"));

afterEach(() => vi.unstubAllEnvs());

describe("security override compatibility", () => {
  it("renders inline and display math through Nextra's KaTeX pipeline", async () => {
    // Match Nextra's compiler to its evaluator, which uses the dev runtime in tests.
    vi.stubEnv("NODE_ENV", "development");
    const compiled = await compileMdx("Inline $x^2$.\n\n$$\n\\frac{a}{b}\n$$", {
      latex: true,
      codeHighlight: false,
      useCachedCompiler: false,
    });
    const { default: Content } = evaluate(compiled);
    const html = renderToStaticMarkup(<Content />);
    expect(html).toContain('class="katex"');
    expect(html).toContain('class="katex-display"');
    expect(html).toContain('xmlns="http://www.w3.org/1998/Math/MathML"');
    expect(html).not.toContain("katex-error");
  });

  it("allows a default-project file through typescript-eslint's minimatch filter", () => {
    const { parser } = nextRequire("typescript-eslint") as {
      parser: {
        parseForESLint: (
          source: string,
          options: Record<string, unknown>,
        ) => {
          ast: { type: string };
          services: { program?: { getTypeChecker: () => unknown } };
        };
      };
    };
    const result = parser.parseForESLint("const answer: number = 42;", {
      filePath: resolve("dependency-audit-probe.ts"),
      tsconfigRootDir: process.cwd(),
      projectService: { allowDefaultProject: ["dependency-audit-probe.ts"] },
    });
    expect(result.ast.type).toBe("Program");
    expect(result.services.program?.getTypeChecker()).toBeDefined();
  });
  it("keeps ts-morph's source-file glob filtering working", () => {
    const nextraRequire = createRequire(
      projectRequire.resolve("nextra/package.json"),
    );
    const { Project } = nextraRequire("ts-morph") as {
      Project: new (options: { useInMemoryFileSystem: boolean }) => {
        createSourceFile: (path: string, content: string) => unknown;
        getSourceFiles: (globs: string[]) => { getFilePath: () => string }[];
      };
    };
    const project = new Project({ useInMemoryFileSystem: true });
    project.createSourceFile("/src/profile.ts", "export const name = 'Maya';");
    project.createSourceFile(
      "/src/profile.test.ts",
      "export const test = true;",
    );
    const files = project.getSourceFiles([
      "/src/**/*.ts",
      "!/src/**/*.test.ts",
    ]);
    expect(files.map((file) => file.getFilePath())).toEqual([
      "/src/profile.ts",
    ]);
  });
});
