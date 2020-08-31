import Parser from "../Parser/Parser";
import Category from "./Category";
import { AnyTag } from "../../utils/types";
import AliasTag from "../Tags/AliasTag";
import SelectorTag from "../Tags/SelectorTag";
import Tag from "../Tags/Tag";
import BooleanTag from "../Tags/BooleanTag";

export interface ProjectStructure {
	[key: string]: Category;
}

export default class CategoryProject {
	readonly parser: Parser;
	readonly structure: ProjectStructure;
	category_types: string[] = [];
	title: string = "Documentation";

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
		this.add_tag(new Tag("example", 1, false, false, true));
		this.add_tag(new AliasTag("constructor", 0, ["@category globals"]));
		this.add_tag(new Tag("field", 3, false));
		this.add_tag(new BooleanTag("internal"));

		/* Default category */
		this.add_category(new Category("Globals"), false, "globals");
		this.add_category(new Category("Classes"), true, "class");
		this.add_category(new Category("Libraries"), true, "library");
		this.add_category(new Category("Hooks"), true, "hookcat");
		this.add_category(new Category("Panels"), true, "panel", true, false, [
			"@clientside",
		]);
		this.add_category(
			new Category("Enums", "table"),
			false,
			"enum",
			false,
			true
		);
		this.add_category(
			new Category("Structs", "table"),
			false,
			"struct",
			false,
			true
		);

		/* Default categories that define types. */
		this.add_category_type("Classes")
		this.add_category_type("Enums")
		this.add_category_type("Structs")
		this.add_category_type("Panels")
	}

	set_title(title: string): this {
		this.title = title;

		return this;
	}

	add_tag(tag: AnyTag, allowed_as_global: boolean = false): this {
		this.parser.add_tag(tag, allowed_as_global);

		return this;
	}

	add_category_type(category: string): this {
		const key = category.toLocaleLowerCase();

		if (this.structure[key]) {
			this.category_types.push(key);
		} else {
			throw new Error(`Couldn't find a(n) '${category}' category.`);
		}

		return this;
	}

	add_category(
		category: Category,
		has_subcategory: boolean,
		tag_name?: string,
		global_tag: boolean = true,
		include_name_tag: boolean = false,
		extras: string[] = []
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
			category.create_alias(
				this,
				key,
				tag_name,
				has_subcategory,
				global_tag,
				include_name_tag,
				extras
			);
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
