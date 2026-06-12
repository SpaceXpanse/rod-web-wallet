import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "..");
const outputDirectory = path.join(repositoryRoot, "public");

const staticEntries = [
	".nojekyll",
	"CNAME",
	"css",
	"fonts",
	"images",
	"index.html",
	"js",
	"manifest.webmanifest",
	"sw.js"
];

await rebuildStaticAssets();

async function rebuildStaticAssets() {
	await rm(outputDirectory, { recursive: true, force: true });
	await mkdir(outputDirectory, { recursive: true });

	for (const staticEntry of staticEntries) {
		const sourcePath = path.join(repositoryRoot, staticEntry);
		const destinationPath = path.join(outputDirectory, staticEntry);
		await cp(sourcePath, destinationPath, { recursive: true });
	}

	await writeFile(path.join(outputDirectory, ".gitkeep"), "");
	console.log(`Built Cloudflare Worker static assets in ${outputDirectory}`);
}
