import SelectorTag from "./SelectorTag";

export default class BooleanTag extends SelectorTag {
	constructor(name: string) {
		super(name, ["true", "false"]);
	}

	process(string: string): string[] {
		if (string === `@${this.name}`) {
			return ["true"];
		}

		return super.process(string);
	}
}
