
export interface FieldInfo {
    type: string;
    key: string;
    description: string;
}

export default class TablePage {
    readonly item: string;

	constructor(
		public readonly name: string,
        public readonly description?: string,
        public readonly fields?: FieldInfo[]
	) {
        this.item = "table"
    }

    print(level: number = 0) {
        console.log("    ".repeat(level) + this.name);
    }
}

