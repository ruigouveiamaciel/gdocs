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
    name: string,
    type: string,
    description: string
}

export interface FunctionReturns {
    type: string,
    description: string
}

export interface FunctionPage {
    name: string;
    description?: string;
    parameters?: FunctionParameters[];
    returns?: FunctionReturns[];
    examples?: string[];
    item: "function"
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
    item: "table"
}

export type ValidSubcategory =
	| Category
	| ClassCategory
	| FunctionPage
	| TablePage
	| TableCategory;

export interface Category {
    name: string;
    description?: string;
    subcategories: {
		[key: string]: ValidSubcategory;
    };
    item: "category"
}

export interface ClassAttribute {
	type: string;
	name: string;
	description: string;
}

export interface ClassCategory {
    name: string;
    description?: string;
    subcategories: {
		[key: string]: ValidSubcategory;
    };
    attributes?: ClassAttribute[];
    item: "category_class"
}

export interface TableCategory {
    name: string;
    description?: string;
    subcategories: {
		[key: string]: ValidSubcategory;
    };
    item: "category_table"
}

export interface ProjectStructure {
	[key: string]: Category | TableCategory | ClassCategory;
}

/**************************************************************************** */

export const project: ProjectStructure = require("../parsed.json")

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
