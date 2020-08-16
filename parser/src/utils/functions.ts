import { DocBlock } from "../classes/Parser/Tags";

export function error_message(
	path: string,
	line: number | number[],
	message: string
) {
	let line_string: string;
	if (line instanceof Array) {
		line_string = Array.from(new Set(line))
			.map((option, index) => {
				if (index >= line.length - 2) {
					return index == line.length - 2 ? `${option} and ` : option;
				}

				return `${option}, `;
			})
			.join("");
	} else {
		line_string = String(line);
	}

	throw new Error(`(${path}) (line ${line_string}) ${message}`);
}

export function warning_message(
	path: string,
	line: number | number[],
	message: string
) {
	let line_string: string;
	if (line instanceof Array) {
		line_string = Array.from(new Set(line))
			.map((option, index) => {
				if (index >= line.length - 2) {
					return index == line.length - 2 ? `${option} and ` : option;
				}

				return `${option}, `;
			})
			.join("");
	} else {
		line_string = String(line);
	}

	console.warn(`(${path}) (line ${line_string}) ${message}`);
}

export function get_unique(block: DocBlock, tag_name: string, index: number = 0) {
	return block[tag_name] ? block[tag_name][0].args![index] : undefined;
}

export function get_multiple(block: DocBlock, tag_name: string): string[][] {
	return block[tag_name] ? block[tag_name].map(tag => tag.args as string[]) : []
}