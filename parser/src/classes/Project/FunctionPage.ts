export interface FunctionParameters {
    name: string,
    type: string,
    description: string
}

export interface FunctionReturns {
    type: string,
    description: string
}

export default class FunctionPage {
    readonly item: string;

	constructor(
		public readonly name: string,
		public readonly description?: string,
        public readonly parameters?: FunctionParameters[],
        public readonly returns?: FunctionReturns[],
        public readonly examples?: string[],
	) {
        this.item = "function"
    }

    print(level: number = 0) {
        console.log("    ".repeat(level) + this.name);
    }
}
