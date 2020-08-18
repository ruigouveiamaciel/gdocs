import path from "path";
import CategoryProject from "./classes/Project/CategoryProject";
import fs from "fs";
import parseArgs from "minimist";

/**************************************************************** */

const project = new CategoryProject();
const args = parseArgs(process.argv.slice(2));
const directories =
	typeof args.d === "string" ? [args.d] : args.d instanceof Array ? args.d : [];

/* Parse & Output */
directories.forEach(directory => {
	project.parse(path.join(process.cwd(), directory));
});
fs.writeFileSync(
	path.join(__dirname, "..", "..", "builder", "src", "parsed.json"),
	JSON.stringify(project.structure, undefined, 4)
);
