import Tag from "./Tag";

export default class SelectorTag extends Tag {
	readonly options: Set<string>;

	constructor(name: string, options: string[], unique: boolean = true) {
		super(name, 1, unique);

		this.options = new Set(options);
	}

	add_options(...options: string[]): this {
		options.forEach(this.options.add);

		return this;
	}

	delete_options(...options: string[]): this {
		options.forEach(this.options.delete);

		return this;
	}

	has_option(option: string): boolean {
		return this.options.has(option);
	}

	options_to_string(): string {
		const optionsArray = Array.from(this.options);

		return optionsArray
			.map((option, index) => {
				if (index >= optionsArray.length - 2) {
					return index == optionsArray.length - 2
						? `'${option}' and `
						: `'${option}'`;
				}

				return `'${option}', `;
			})
			.join("");
	}

	process(input: string): string[] {
		const match = super.process(input);

		if (!this.has_option(match[0])) {
			throw `'${match[0]}' is not a valid option for the '@${this.name}' `
			+ `tag. Valid options are: ${this.options_to_string()}.`;
		}

		return match;
	}
}
