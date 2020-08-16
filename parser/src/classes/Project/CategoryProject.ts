import Parser from "../Parser/Parser";
import Category from "./Category";
import { DocBlock } from "../Parser/Tags";
import { get_unique, get_multiple } from "../../utils/functions";
import { AnyTag } from "../../utils/types";
import AliasTag from "../Tags/AliasTag";
import FunctionPage, {
	FunctionParameters,
	FunctionReturns,
} from "./FunctionPage";
import SelectorTag from "../Tags/SelectorTag";
import Tag from "../Tags/Tag";
import ClassCategory from "./ClassCategory";
import TableCategory from "./TableCategory";

export interface ProjectStructure {
	[key: string]: Category;
}

export default class CategoryProject {
	readonly parser: Parser;
	readonly structure: ProjectStructure;

	constructor() {
		this.parser = new Parser();
		this.structure = {};

		/* Default tags */
		this.add_tag(
			new SelectorTag("realm", ["client", "shared", "server"]),
			true
		);
		this.add_tag(new AliasTag("clientside", 0, ["@realm client"]));
		this.add_tag(new AliasTag("serverside", 0, ["@realm server"]));
		this.add_tag(new AliasTag("shared", 0, ["@realm shared"]));
		this.add_tag(new Tag("tparam", 3, false));
		this.add_tag(new Tag("treturn", 2, false));
		this.add_tag(new Tag("example", 1, false));
		this.add_tag(new AliasTag("construct", 0, ["@category globals"]));
		this.add_tag(new Tag("field", 3, false));
		this.add_tag(
			new AliasTag("hook", 2, ([subcategory, hook]) => {
				return [
					"@category hooks",
					`@subcategory ${subcategory}`,
					`@name ${hook}`,
				];
			})
		);
		this.add_tag(
			new AliasTag("panel", 1, ([name]) => ["@global", "@category panels", `@subcategory ${name}`, "@clientside"])
		)
		this.add_tag(
			new AliasTag("enum", 1, ([name]) => ["@category enums", `@name ${name}`])
		);
		this.add_tag(
			new AliasTag("struct", 1, ([name]) => [
				"@category structs",
				`@name ${name}`,
			])
		);

		/* Default category */
		this.add_category(new Category("Globals"), false, undefined);
		this.add_category(new ClassCategory("Classes"), true, "class");
		this.add_category(new Category("Libraries"), true, "library");
		this.add_category(new Category("Hooks"), true, undefined);
		this.add_category(new Category("Panels"), true, undefined);
		this.add_category(new TableCategory("Enums"), false, undefined);
		this.add_category(new TableCategory("Structs"), false, undefined);
	}

	add_tag(tag: AnyTag, allowed_as_global: boolean = false): this {
		this.parser.add_tag(tag, allowed_as_global);

		return this;
	}

	add_category(
		category: Category,
		has_subcategory: boolean,
		tag_name?: string
	) {
		const key = category.name.toLocaleLowerCase();
		this.structure[key] = category;

		this.parser.add_category(
			key,
			has_subcategory,
			category.add_item(key, this.structure),
			has_subcategory
				? category.create_subcategory(key, this.structure)
				: undefined
		);

		if (tag_name) {
			category.create_alias(key, tag_name, has_subcategory, this);
		}
	}

	parse(directory: string): this {
		this.parser.parse(directory);

		return this;
	}

	print(level: number = 0) {
		console.log("    ".repeat(level) + "CategoryProject");

		for (let name in this.structure) {
			this.structure[name].print(level + 1);
		}
	}
}
