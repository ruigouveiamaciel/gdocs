import FunctionPage, {
	FunctionParameters,
	FunctionReturns,
} from "./FunctionPage";
import CategoryProject, { ProjectStructure } from "./CategoryProject";
import { DocBlock } from "../Parser/Tags";
import { get_unique, get_multiple } from "../../utils/functions";
import AliasTag from "../Tags/AliasTag";
import ClassCategory from "./ClassCategory";
import TablePage from "./TablePage";

export type ValidSubcategory =
	| Category
	| ClassCategory
	| FunctionPage
	| TablePage;

export default class Category {
	readonly subcategories: {
		[key: string]: ValidSubcategory;
	};
	item: string;

	constructor(public readonly name: string, public description?: string) {
		this.subcategories = {};
		this.item = "category";
	}

	set_description(description?: string): this {
		if (!this.description) {
			this.description = description;
		}

		return this;
	}

	add_subcategory(subcategory: ValidSubcategory): this {
		this.subcategories[subcategory.name] = subcategory;

		return this;
	}

	has_subcategory(name: string) {
		return this.subcategories[name] !== undefined;
	}

	get_subcategory(name: string) {
		return this.subcategories[name];
	}

	print(level: number = 0) {
		console.log("    ".repeat(level) + this.name);

		for (let name in this.subcategories) {
			this.subcategories[name].print(level + 1);
		}
	}

	add_item(category: string, structure: ProjectStructure) {
		const create_sub = this.create_subcategory(category, structure);

		return (block: DocBlock, has_subcategory: boolean) => {
			const name = get_unique(block, "name") as string;
			const description = get_multiple(block, "description")
				.map((tag) => tag[0])
				.join("\n\n")
				.trim();
			const params: FunctionParameters[] = get_multiple(block, "tparam").map(
				(param) => ({
					type: param[0],
					name: param[1],
					description: param[2],
				})
			);
			const returns: FunctionReturns[] = get_multiple(block, "treturn").map(
				(ret) => ({
					type: ret[0],
					description: ret[1],
				})
			);
			const examples: string[] = get_multiple(block, "example").map(
				(example) => example[0]
			);
			const function_page = new FunctionPage(
				name,
				description != "" ? description : undefined,
				params.length > 0 ? params : undefined,
				returns.length > 0 ? returns : undefined,
				examples.length > 0 ? examples : undefined
			);

			if (has_subcategory) {
				const subcategory = get_unique(block, "subcategory") as string;

				if (!structure[category].has_subcategory(subcategory)) {
					create_sub({
						subcategory: block["subcategory"],
					});
				}

				const sub = structure[category].get_subcategory(
					subcategory
				) as Category;

				sub.add_subcategory(function_page);
			} else {
				structure[category].add_subcategory(function_page);
			}
		};
	}

	create_subcategory(category: string, structure: ProjectStructure) {
		return (block: DocBlock) => {
			const subcategory = get_unique(block, "subcategory") as string;
			const description = get_multiple(block, "description")
				.map((tag) => tag[0])
				.join("\n\n");
			const description_arg = description != "" ? description : undefined;

			if (!structure[category].has_subcategory(subcategory)) {
				structure[category].add_subcategory(
					new Category(subcategory, description_arg)
				);
			} else {
				const sub = structure[category].get_subcategory(
					subcategory
				) as Category;

				sub.set_description(description_arg);
			}
		};
	}

	create_alias(
		key: string,
		tag_name: string,
		has_subcategory: boolean,
		project: CategoryProject
	) {
		if (has_subcategory) {
			project.add_tag(
				new AliasTag(tag_name, 1, ([name]) => [
					"@global",
					`@category ${key}`,
					`@subcategory ${name}`,
				])
			);
		} else {
			project.add_tag(
				new AliasTag(tag_name, 0, ["@global", `@category ${key}`])
			);
		}
	}
}
