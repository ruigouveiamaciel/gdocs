import { AnyTag } from "../../utils/types";
import AliasTag from "../Tags/AliasTag";
import { error_message, warning_message } from "../../utils/functions";
import fs from "fs";
import { find_all } from "../../utils/regex";
import BooleanTag from "../Tags/BooleanTag";
import DescriptionTag from "../Tags/DescriptionTag";
import Tag from "../Tags/Tag";

export interface TagInfo {
	line: number;
	match: string;
	from_alias: boolean;
	args?: string[];
}

export interface DocBlock {
	[key: string]: TagInfo[];
}

export interface EnumeratedDockBlocks {
	[key: number]: DocBlock;
}

/* Regex to match documentation blocks and the function name below then if the
   block is above a function */
const block_re = /^(?: |\t)*(?<block>(?:(?:--.*)(?:[\n\r\u2028\u2029](?: |\t)*--.*)*))(?:[\n\r\u2028\u2029](?: |\t)*function(?: |\t)+(?<name>(?:\w|\.|:)+)\()?/gm;

/* Regex to find all the tags in a block. */
const tags_re = /(?:(?: |\t)*@(?<tag_name>\w+)(?![^ \t\n\r\u2028\u2029])(?:(?:.|[\n\r\u2028\u2029])(?!^(?: |\t)*@\w+))*)|(?:(?:.|[\n\r\u2028\u2029])(?!^(?: |\t)*@\w+))+/gm;

/* Regex to trim spaces and carriage return characters */
const carriage_re = /\r/g;
const uncomment_re = /^(?: |\t)*(--+)/gm;
const trim_left_re = /^((?: |\t)*)/gm;
const rich_trim_re = /^ /gm;
const trim_right_re = /(.)(?: |\t)*[\n\r\u2028\u2029]((?!@\w+).)/g;
const ignore_re = /@ignore/g
export default class Tags {
	tags: {
		[key: string]: AnyTag;
	};
	alias: {
		[key: string]: AliasTag;
	};
	allowed_globals: string[];

	constructor() {
		/* Objects with no prototype to avoid name collisions */
		this.tags = Object.create(null, {});
		this.alias = Object.create(null, {});
		this.allowed_globals = [];

		/* These tags are hardcoded and are essential for the functioning of
		this class.*/
		this.add_tag(new BooleanTag("global"));
		this.add_tag(new DescriptionTag());
		this.add_tag(new Tag("name", 1));
	}

	add_tag(tag: AnyTag, allowed_as_global: boolean = false) {
		if (this.tags[tag.name] || this.alias[tag.name]) {
			throw new Error(`The '@${tag.name}' tag already exists.`);
		}

		if (tag instanceof AliasTag) {
			this.alias[tag.name] = tag;
		} else {
			this.tags[tag.name] = tag;

			if (allowed_as_global) {
				this.allowed_globals.push(tag.name);
			}
		}
	}

	private find_and_add_tags(
		path: string,
		block: DocBlock,
		first_line: number,
		string: string,
		from_alias: boolean = false
	) {
		find_all(tags_re, string).forEach((tag_match) => {
			let tag_name = tag_match.groups?.tag_name ?? "description";
			const line = first_line + (from_alias ? 0 : tag_match.line - 1);

			/* Check if the tag exists. */
			if (!this.tags[tag_name] && !this.alias[tag_name]) {
				error_message(
					path,
					line,
					`The tag '@${tag_name}' doesn't exist.`
				);
			}

			const rich = (this.tags[tag_name] || this.alias[tag_name]).rich;

			const tag_info: TagInfo = {
				line: line,
				match: rich
					? tag_match[0].replace(rich_trim_re, "")
					: tag_match[0]
							.replace(trim_left_re, "")
							.replace(trim_right_re, "$1 $2"),
				from_alias: from_alias,
			};

			block[tag_name] = block[tag_name] ?? [];
			block[tag_name].push(tag_info);
		});
	}

	process_file(path: string): EnumeratedDockBlocks {
		const blocks: DocBlock[] = [];
		const file_content = fs
			.readFileSync(path, "utf8")
			.replace(carriage_re, "");
		const block_matches = find_all(block_re, file_content);

		block_matches.forEach((match) => {
			/* Object with no prototype to avoid name collisions. */
			const block: DocBlock = Object.create(null, {});
			blocks.push(block);

			if (match.groups!.block.match(ignore_re)) {
				return; /* Ignore this block if @ignore is found. */
			}

			const uncomment_block = match.groups!.block.replace(
				uncomment_re,
				""
			);
			this.find_and_add_tags(path, block, match.line, uncomment_block);

			if (!block["name"] && match.groups?.name) {
				this.find_and_add_tags(
					path,
					block,
					-1,
					`@name ${match.groups.name}`
				);
			}
		});

		/* Process all alias tags */
		let found_alias = true;
		while (found_alias) {
			found_alias = false;

			blocks.forEach((block) => {
				for (let tag_name in block) {
					if (!this.alias[tag_name]) {
						continue;
					}

					found_alias = true;

					for (let i = 0; i < block[tag_name].length; i++) {
						const tag: TagInfo = block[tag_name][i];

						try {
							const new_tags = this.alias[tag_name].convert(
								tag.match
							);

							new_tags.forEach((new_tag) => {
								this.find_and_add_tags(
									path,
									block,
									tag.line,
									new_tag,
									true
								);
							});
						} catch (e) {
							if (e instanceof Error) {
								throw e;
							}
							error_message(path, tag.line, e);
						}
					}

					delete block[tag_name];
				}
			});
		}

		/* Check for duplicate unique tags. */
		blocks.forEach((block) => {
			for (let tag_name in block) {
				if (this.tags[tag_name].unique && block[tag_name].length > 1) {
					const lines = block[tag_name].map(({ line }) => line);

					error_message(
						path,
						lines,
						`The '@${tag_name}' tag should only be declared ` +
							`once but it has been declared multiple times. ` +
							`If one the given lines is not a '@${tag_name}' ` +
							`tag then it is an alias tag that deconstructs ` +
							`into it.`
					);
				}
			}
		});

		/* Process all tags */
		let globals: DocBlock = Object.create(null, {});
		blocks.forEach((block, index) => {
			Object.entries(globals).forEach(([tag_name, tags]) => {
				if (!block[tag_name] || !this.tags[tag_name].unique) {
					block[tag_name] = block[tag_name] ?? [];
					block[tag_name].push(...tags);
				}
			});

			for (let tag_name in block) {
				const tags = block[tag_name];

				tags.forEach((tag) => {
					try {
						tag.args = this.tags[tag_name].process(tag.match);
					} catch (e) {
						if (e instanceof Error) {
							throw e;
						}
						error_message(path, tag.line, e);
					}
				});
			}

			if (block["global"] && block["global"][0].args![0] == "true") {
				globals = Object.assign(Object.create(null, {}), block);

				for (let tag_name in globals) {
					if (!this.allowed_globals.includes(tag_name)) {
						delete globals[tag_name];
					}
				}
			}
		});

		const blocks_enumerated: EnumeratedDockBlocks = {};
		blocks.forEach((block, index) => {
			if (Object.keys(block).length !== 0) {
				blocks_enumerated[block_matches[index].line] = block;
			}
		});

		/* Check for blocks with no @global that have no @name tag */
		for (let line_number in blocks_enumerated) {
			const block = blocks_enumerated[line_number];

			if (
				(!block["global"] || block["global"][0].args![0] != "true") &&
				!block["name"]
			) {
				warning_message(
					path,
					Number(line_number),
					"A documentation block with no '@global' tag has been " +
						"found without a '@name' tag. No function name could " +
						"be found below the block. Please provide a '@name' " +
						"tag. This block will be ignored until so."
				);

				delete blocks_enumerated[line_number];
			}
		}

		return blocks_enumerated;
	}
}
