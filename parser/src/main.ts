import path from "path";
import CategoryProject from "./classes/Project/CategoryProject";
import fs from "fs";
import parseArgs from "minimist";
import Category from "./classes/Project/Category";

/**************************************************************** */

interface TabDefinition {
	name?: string;
	icon?: string;
	tag_name?: string;
	has_subcategory?: boolean;
	global_tag?: boolean;
	include_name_tag?: boolean;
	extras?: string[];
}

const icons: {
	[key: string]: string
} = {}
const project = new CategoryProject();
const args = parseArgs(process.argv.slice(2));
const directories =
	typeof args.d === "string"
		? [args.d]
		: args.d instanceof Array
		? args.d
		: [];
const config =
	typeof args.config === "string"
		? [args.config]
		: args.config instanceof Array
		? args.config
		: [];

if (config.length > 1) {
	throw new Error(
		"Multiple config files specified. Please only specify one file."
	);
} else if (config.length === 1) {
	const configContent = fs.readFileSync(
		path.join(__dirname, "..", config[0]),
		"utf-8"
	);
	const configJSON = JSON.parse(configContent);

	if (configJSON.title && typeof configJSON.title === "string") {
		project.set_title(configJSON.title);
	}

	const tabs = configJSON.tabs instanceof Array ? configJSON.tabs : [];
	tabs.forEach((tab: TabDefinition) => {
		if (!tab.name) {
			throw new Error("One of the tabs in the config is missing a name.");
		}

		if (tab.icon) {
			icons[tab.name] = tab.icon
		}

		project.add_category(
			new Category(tab.name),
			tab.has_subcategory === undefined ? true : tab.has_subcategory,
			tab.tag_name,
			tab.global_tag,
			tab.include_name_tag,
			tab.extras
		);
	});
}

/* Parse & Output */
directories.forEach((directory) => {
	project.parse(path.join(process.cwd(), directory));
});
fs.writeFileSync(
	path.join(__dirname, "..", "..", "builder", "src", "parsed.json"),
	JSON.stringify(
		{
			category_types: project.category_types,
			structure: project.structure,
			title: project.title,
			icons: icons
		},
		undefined,
		4
	)
);
