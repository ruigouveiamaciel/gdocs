import Tag from "./Tag";

type AliasCallback = (args: string[]) => string[];

export default class AliasTag extends Tag {
	constructor(
		name: string,
		argsCount: number,
		public readonly callback: AliasCallback | string[],
		unique: boolean = true
	) {
		super(name, argsCount, unique, true);
	}

	convert(string: string): string[] {
		const args = super.process(string);
		if (this.callback instanceof Function) {
			return this.callback(args);
		}

		return this.callback;
	}
}
