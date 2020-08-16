import fs from "fs";
import path from "path";
import Tags, { DocBlock } from "./Tags";
import { error_message } from "../../utils/functions";
import SelectorTag from "../Tags/SelectorTag";
import Tag from "../Tags/Tag";
import { AnyTag } from "../../utils/types";

export type CategoryCallbackFunction = (
	args: DocBlock,
	has_subcategory: boolean
) => void;

export default class Parser {
	categories: {
		[key: string]: {
			subcategory: boolean;
			callback: CategoryCallbackFunction;
			global_callback?: CategoryCallbackFunction;
		};
	};
	tags: Tags;
	default_category: string | undefined;
	setup: boolean;

	constructor() {
		this.categories = {};
		this.tags = new Tags();
		this.default_category = undefined;
		this.setup = false;

		/* These tags are hardcoded and are essential for the functioning of
		this class.*/
		this.tags.add_tag(new Tag("subcategory", 1), true);
	}

	add_tag(tag: AnyTag, allowed_as_global: boolean = false): this {
		this.tags.add_tag(tag, allowed_as_global);

		return this;
	}

	add_category(
		name: string,
		has_subcategory: boolean,
		callback: CategoryCallbackFunction,
		global_callback?: CategoryCallbackFunction
	): this {
		this.categories[name] = {
			subcategory: has_subcategory,
			callback: callback,
			global_callback: global_callback,
		};

		if (!this.default_category) {
			this.default_category = name;
		}

		return this;
	}

	private parse_file(path: string) {
		const blocks = this.tags.process_file(path);

		for (let line_number in blocks) {
			const block = blocks[line_number];
			const global = block["global"] && block["global"][0].args![0] == "true";
			const category = block["category"]
				? block["category"][0].args![0]
				: this.default_category!;

			try {
				if (this.categories[category].subcategory && !block["subcategory"]) {
					throw `Missing '@subcategory' tag for '@category ${category}'.`
				} else if (global && this.categories[category].global_callback) {
					this.categories[category].global_callback!(
						block,
						this.categories[category].subcategory
					);
				} else {
					this.categories[category].callback!(
						block,
						this.categories[category].subcategory
					);
				}
			} catch (e) {
				if (e instanceof Error) {
					throw e;
				}
				error_message(path, Number(line_number), e);
			}
		}
	}

	private parse_directory(directory: string) {
		const dir_info = fs.readdirSync(directory, { withFileTypes: true });
		const subdirectories = dir_info
			.filter((d) => d.isDirectory())
			.map((d) => d.name);
		const files = dir_info
			.filter((d) => {
				return d.isFile() && path.extname(d.name).toLowerCase() == ".lua";
			})
			.map((d) => d.name);

		files.forEach((file) => {
			this.parse_file(path.join(directory, file));
		});

		subdirectories.forEach((subdirectory) => {
			this.parse_directory(path.join(directory, subdirectory));
		});
	}

	parse(directory: string): this {
		if (!this.setup) {
			if (this.default_category === undefined) {
				throw new Error("There are no categories defined.");
			}

			this.add_tag(new SelectorTag("category", Object.keys(this.categories)), true);
			this.setup = true;
		}

		this.parse_directory(directory);

		return this;
	}
}
