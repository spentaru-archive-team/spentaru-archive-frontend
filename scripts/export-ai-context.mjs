import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const outputJson = path.join(root, "AI_CONTEXT_FULL.json");
const outputMd = path.join(root, "AI_CONTEXT_FULL.md");

const EXCLUDED_DIRS = new Set([
	".git",
	"node_modules",
	"dist",
	"build",
	".vscode",
]);

const EXCLUDED_FILES = new Set([
	"package-lock.json",
	".DS_Store",
]);

const EXCLUDED_EXT = new Set([
	".png",
	".jpg",
	".jpeg",
	".gif",
	".webp",
	".ico",
	".svg",
	".pdf",
	".zip",
	".woff",
	".woff2",
	".ttf",
	".eot",
	".mp4",
	".mp3",
]);

const MAX_FILE_SIZE = 512 * 1024;

function normalizeToPosix(p) {
	return p.split(path.sep).join("/");
}

function shouldSkipFile(fileName, absPath, stat) {
	const ext = path.extname(fileName).toLowerCase();
	if (EXCLUDED_FILES.has(fileName)) return true;
	if (EXCLUDED_EXT.has(ext)) return true;
	if (fileName === ".env") return true;
	if (fileName.startsWith(".env.")) return true;
	if (stat.size > MAX_FILE_SIZE) return true;
	if (absPath.includes(`${path.sep}.git${path.sep}`)) return true;
	if (absPath.includes(`${path.sep}node_modules${path.sep}`)) return true;
	return false;
}

async function readTextSafe(filePath) {
	try {
		return await fs.readFile(filePath, "utf8");
	} catch {
		return null;
	}
}

async function walk(dir, rel = "") {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	entries.sort((a, b) => a.name.localeCompare(b.name));

	const files = [];
	for (const entry of entries) {
		const abs = path.join(dir, entry.name);
		const relPath = rel ? path.join(rel, entry.name) : entry.name;

		if (entry.isDirectory()) {
			if (EXCLUDED_DIRS.has(entry.name)) continue;
			const nested = await walk(abs, relPath);
			files.push(...nested);
			continue;
		}

		if (!entry.isFile()) continue;

		const stat = await fs.stat(abs);
		if (shouldSkipFile(entry.name, abs, stat)) continue;

		const content = await readTextSafe(abs);
		if (content === null) continue;

		files.push({
			path: normalizeToPosix(relPath),
			size: stat.size,
			content,
		});
	}

	return files;
}

function buildTreePaths(files) {
	return files.map((f) => f.path);
}

function buildMarkdown(files) {
	const lines = [];
	lines.push("# AI Workspace Context");
	lines.push("");
	lines.push(`Generated: ${new Date().toISOString()}`);
	lines.push(`Root: ${normalizeToPosix(root)}`);
	lines.push("");
	lines.push("## File Structure");
	lines.push("");
	for (const file of files) {
		lines.push(`- ${file.path}`);
	}

	lines.push("");
	lines.push("## File Contents");
	lines.push("");

	for (const file of files) {
		const ext = path.extname(file.path).toLowerCase();
		const lang =
			ext === ".js" || ext === ".jsx"
				? "jsx"
				: ext === ".ts" || ext === ".tsx"
					? "tsx"
					: ext === ".json"
						? "json"
						: ext === ".css"
							? "css"
							: ext === ".md"
								? "markdown"
								: ext === ".html"
									? "html"
									: "text";

		lines.push(`### ${file.path}`);
		lines.push("");
		lines.push(`\`\`\`${lang}`);
		lines.push(file.content);
		lines.push("\`\`\`");
		lines.push("");
	}

	return lines.join("\n");
}

async function main() {
	const files = await walk(root);
	const payload = {
		generatedAt: new Date().toISOString(),
		root: normalizeToPosix(root),
		fileCount: files.length,
		structure: buildTreePaths(files),
		files,
	};

	await fs.writeFile(outputJson, JSON.stringify(payload, null, 2), "utf8");
	await fs.writeFile(outputMd, buildMarkdown(files), "utf8");

	console.log(`Generated ${path.basename(outputJson)} with ${files.length} files.`);
	console.log(`Generated ${path.basename(outputMd)} with ${files.length} files.`);
}

main().catch((err) => {
	console.error("Failed to export AI context:", err);
	process.exit(1);
});
