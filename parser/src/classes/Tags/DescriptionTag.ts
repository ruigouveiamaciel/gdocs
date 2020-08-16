import Tag from "./Tag";

export default class DescriptionTag extends Tag {
    constructor() {
        super("description", 1, false)
    }

    process(string: string): string[] {
        return super.process(`@${this.name} ${string}`)
    }
}
