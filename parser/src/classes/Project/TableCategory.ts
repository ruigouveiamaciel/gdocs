import Category from "./Category";
import { ProjectStructure } from "./CategoryProject";
import { DocBlock } from "../Parser/Tags";
import { get_unique, get_multiple } from "../../utils/functions";
import { FunctionParameters, FunctionReturns } from "./FunctionPage";
import TablePage, { FieldInfo } from "./TablePage";

export default class TableCategory extends Category {
    constructor(name: string, description?: string) {
		super(name, description)

		this.item = "category_table"
    }

    add_item(category: string, structure: ProjectStructure) {
		const create_sub = this.create_subcategory(category, structure);

		return (block: DocBlock, has_subcategory: boolean) => {
			const name = get_unique(block, "name") as string;
			const description = get_multiple(block, "description")
				.map((tag) => tag[0])
				.join("\n\n")
				.trim();
			const fields: FieldInfo[] = get_multiple(block, "field").map((field) => ({
				type: field[0],
				key: field[1],
				description: field[2]
			}))

			const table_page = new TablePage(
				name,
				description != "" ? description : undefined,
				fields.length > 0 ? fields : undefined
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

				sub.add_subcategory(table_page);
			} else {
				structure[category].add_subcategory(table_page);
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
					new TableCategory(subcategory, description_arg)
				);
			} else {
				const sub = structure[category].get_subcategory(
					subcategory
				) as Category;

				sub.set_description(description_arg);
			}
		};
	}
}
