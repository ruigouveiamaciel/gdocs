import FunctionPage from "./FunctionPage";
import CategoryProject, { ProjectStructure } from "./CategoryProject";
import { DocBlock } from "../Parser/Tags";
import { get_unique, get_multiple } from "../../utils/functions";
import AliasTag from "../Tags/AliasTag";
import TablePage, { FieldInfo } from "./TablePage";

export type ValidSubcategory = Category | FunctionPage | TablePage;

export type ValidPageTypes = "function" | "table";

export default class Category {
	readonly subcategories: {
		[key: string]: ValidSubcategory;
	};
	description?: string;
	fields?: FieldInfo[];
	item: string;

	constructor(
		public readonly name: string,
		public readonly pageType: ValidPageTypes = "function"
	) {
		this.subcategories = {};
		this.item = "category";
	}

	set_description(description?: string): this {
		if (!this.description) {
			this.description = description;
		}

		return this;
	}

	set_fields(fields?: FieldInfo[]): this {
		if (!this.fields) {
			this.fields = fields;
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
			const page =
				this.pageType === "function"
					? new FunctionPage(
							name,
							description != "" ? description : undefined,
							block
					  )
					: new TablePage(
							name,
							description != "" ? description : undefined,
							block
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

				sub.add_subcategory(page);
			} else {
				structure[category].add_subcategory(page);
			}
		};
	}

	create_subcategory(category: string, structure: ProjectStructure) {
		return (block: DocBlock) => {
			const subcategory = get_unique(block, "subcategory") as string;
			const description: string = get_multiple(block, "description")
				.map((tag) => tag[0])
				.join("\n\n");
			const fields: FieldInfo[] = get_multiple(block, "field").map(
				(field) => ({
					type: field[0],
					key: field[1],
					description: field[2],
				})
			);

			if (!structure[category].has_subcategory(subcategory)) {
				structure[category].add_subcategory(
					new Category(subcategory, this.pageType)
				);
			}

			const sub = structure[category].get_subcategory(
				subcategory
			) as Category;

			sub.set_description(description != "" ? description : undefined);
			sub.set_fields(fields.length > 0 ? fields : undefined);
		};
	}

	create_alias(
		project: CategoryProject,
		key: string,
		tag_name: string,
		has_subcategory: boolean,
		global_tag: boolean,
		include_name_tag: boolean,
		extras: string[]
	) {
		const global = global_tag ? ["@global"] : [];

		if (has_subcategory) {
			project.add_tag(
				new AliasTag(
					tag_name,
					include_name_tag ? 2 : 1,
					([subcategory, name]) =>
						[`@category ${key}`, `@subcategory ${subcategory}`]
							.concat(global)
							.concat(include_name_tag ? [`@name ${name}`] : [])
							.concat(extras)
				)
			);
		} else {
			project.add_tag(
				new AliasTag(tag_name, include_name_tag ? 1 : 0, ([name]) =>
					[`@category ${key}`]
						.concat(global)
						.concat(include_name_tag ? [`@name ${name}`] : [])
						.concat(extras)
				)
			);
		}
	}
}
