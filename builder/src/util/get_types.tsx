import { category_types, project } from "./parsed";
import React from "react";
import { Link } from "react-router-dom";

function create_list(
	array: React.ReactElement[],
	or_list: boolean = false
): React.ReactElement {
	if (array.length === 1) {
		return <>{array[0]}</>;
	} else if (array.length > 1) {
		return (
			<>
				{array.slice(0, -2).map((item) => (
					<>
						{item}
						{or_list ? " or " : ", "}
					</>
				))}
				{array[array.length - 2]} {" or "} {array[array.length - 1]}
			</>
		);
	}

	return <></>;
}

export default function get_types(string: string, or_list: boolean = false) {
	const types = string.split("|");
	const result: React.ReactElement[] = [];

	types.forEach((type) => {
		let found = false;

		for (let i = 0; i < category_types.length; i++) {
			const category = category_types[i];

			if (project[category].subcategories[type] !== undefined) {
				result.push(<Link to={`/${category}/${type}`}>{type}</Link>);

				found = true;
				break;
			}
		}

		if (!found) {
			result.push(
				<a href={`https://wiki.facepunch.com/gmod/${type}`}>{type}</a>
			);
		}
	});

	return create_list(result, or_list);
}
