export interface MatchesArray extends RegExpExecArray {
	line: number;
	column: number;
}

export function find_all(regex: RegExp, string: string) {
	if (!regex.global) {
		throw new TypeError("The given RegExp is not a global regex.");
	}

	const matches = [];

	/* Make sure the lastIndex is zero so that we can match everything. */
	regex.lastIndex = 0;

	let match: MatchesArray | null;
	while ((match = regex.exec(string) as MatchesArray | null)) {
		/* Calculate line &  column this match is on. */
		const previous = string.slice(0, match.index);
		match.line = previous.split("\n").length;
		match.column = match.index - previous.length + 1;

		matches.push(match);
	}

	return matches;
}

export function escape_regex(string: string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
