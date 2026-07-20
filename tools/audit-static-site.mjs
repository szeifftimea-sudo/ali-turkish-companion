import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const ignoredDirectories = new Set([
  ".git",
  ".tools",
  ".artifact",
  ".agents",
  "tmp",
  "outputs",
  "_qa_character_bible",
]);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) return [];
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

function cleanReference(reference) {
  return reference.trim().replace(/^['"]|['"]$/g, "").split(/[?#]/, 1)[0];
}

function isLocal(reference) {
  return reference && !/^(?:[a-z]+:|\/\/|#|data:)/i.test(reference);
}

const files = walk(root);
const sourceFiles = files.filter((file) => /\.(?:html|css)$/i.test(file));
const missing = [];
let references = 0;

for (const source of sourceFiles) {
  const content = fs.readFileSync(source, "utf8");
  const matches = [
    ...content.matchAll(/(?:src|href)\s*=\s*["']([^"']+)["']/gi),
    ...content.matchAll(/url\(\s*([^)]+?)\s*\)/gi),
  ];

  for (const match of matches) {
    const reference = cleanReference(match[1]);
    if (!isLocal(reference)) continue;
    references += 1;
    const target = path.resolve(path.dirname(source), reference);
    if (!fs.existsSync(target)) {
      missing.push({
        source: path.relative(root, source),
        reference,
      });
    }
  }
}

console.log(
  JSON.stringify(
    {
      scannedFiles: sourceFiles.length,
      localReferences: references,
      missingReferences: missing.length,
      missing,
    },
    null,
    2,
  ),
);

if (missing.length) process.exitCode = 1;

