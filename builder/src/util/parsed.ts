import {
	mdiCodeBraces,
	mdiBook,
	mdiBookshelf,
	mdiHook,
	mdiViewQuilt,
	mdiFormatListNumbered,
	mdiDatabase,
	mdiCursorDefault,
} from "@mdi/js";

export interface FunctionParameters {
	name: string;
	type: string;
	description: string;
}

export interface FunctionReturns {
	type: string;
	description: string;
}

export interface FunctionPage {
	name: string;
	description?: string;
	parameters?: FunctionParameters[];
	returns?: FunctionReturns[];
	examples?: string[];
	item: "function";
}

export interface FieldInfo {
	type: string;
	key: string;
	description: string;
}

export interface TablePage {
	name: string;
	description?: string;
	fields?: FieldInfo[];
	item: "table";
}

export type ValidSubcategory = Category | FunctionPage | TablePage;

export interface Category {
	name: string;
	description?: string;
	fields?: FieldInfo[];
	subcategories: {
		[key: string]: ValidSubcategory;
	};
	item: "category";
}

export interface ProjectStructure {
	[key: string]: Category;
}

/**************************************************************************** */

const parsed = require("../parsed.json");
export const project: ProjectStructure = parsed.structure;
export const category_types: string[] = parsed.category_types;

export const icons: {
	[key: string]: string;
} = {
	globals: mdiCodeBraces,
	classes: mdiBook,
	libraries: mdiBookshelf,
	hooks: mdiHook,
	panels: mdiViewQuilt,
	enums: mdiFormatListNumbered,
	structs: mdiDatabase,
	default: mdiCursorDefault,
};
