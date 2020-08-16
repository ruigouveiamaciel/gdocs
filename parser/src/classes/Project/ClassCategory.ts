import Category from "./Category";
import { ProjectStructure } from "./CategoryProject";
import { DocBlock } from "../Parser/Tags";
import { get_unique, get_multiple } from "../../utils/functions";

export interface ClassAttribute {
	type: string;
	name: string;
	description: string;
}

export default class ClassCategory extends Category {
	attributes?: ClassAttribute[];

	constructor(name: string, description?: string) {
		super(name);
		this.item = "category_class";
		this.attributes = undefined;
	}

	set_attributes(attributes?: ClassAttribute[]): this {
		if (!this.attributes) {
			this.attributes = attributes;
		}

		return this;
	}

	create_subcategory(category: string, structure: ProjectStructure) {
		return (block: DocBlock) => {
			const subcategory = get_unique(block, "subcategory") as string;
			const description = get_multiple(block, "description")
				.map((tag) => tag[0])
				.join("\n\n");
			const description_arg = description != "" ? description : undefined;
			const attributes: ClassAttribute[] = get_multiple(block, "attribute").map(
				(attribute) => ({
					type: attribute[0],
					name: attribute[1],
					description: attribute[2],
				})
            );
            const attributes_arg = attributes != [] ? attributes : undefined

			if (!structure[category].has_subcategory(subcategory)) {
				structure[category].add_subcategory(
					new ClassCategory(subcategory, description_arg).set_attributes(
						attributes_arg
					)
				);
			} else {
				const sub = structure[category].get_subcategory(
					subcategory
				) as ClassCategory;

				sub.set_description(description_arg);
				sub.set_attributes(attributes_arg);
			}
		};
	}
}
