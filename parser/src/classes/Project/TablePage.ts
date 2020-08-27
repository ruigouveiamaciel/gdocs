import { DocBlock } from "../Parser/Tags";
import { get_multiple, get_unique } from "../../utils/functions";

export interface FieldInfo {
	type: string;
	key: string;
	description: string;
}

export default class TablePage {
	readonly item: "table";
	readonly fields?: FieldInfo[];
	readonly realm?: string;
	readonly internal?: boolean;

	constructor(
		public readonly name: string,
		public readonly description?: string,
		block: DocBlock = {}
	) {
		const fields: FieldInfo[] = get_multiple(block, "field").map(
			(field) => ({
				type: field[0],
				key: field[1],
				description: field[2],
			})
		);
		this.fields = fields.length > 0 ? fields : undefined;
		this.realm = get_unique(block, "realm");
		this.internal =
			get_unique(block, "internal") === "true"
			? true
			: undefined;

		this.item = "table";
	}

	print(level: number = 0) {
		console.log("    ".repeat(level) + this.name);
	}
}
