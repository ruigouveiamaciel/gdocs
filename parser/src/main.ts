import path from "path";
import CategoryProject from "./classes/Project/CategoryProject";
import fs from "fs";

/**************************************************************** */

const project = new CategoryProject();

/* Parse & Output */
project.parse(path.join(__dirname, "..", "examples"));
project.print();
fs.writeFileSync(
	path.join(__dirname, "..", "output.json"),
	JSON.stringify(project.structure, undefined, 4)
);
