import React from "react";
import Page from "../Page";
import { project } from "../../util/parsed";
import { useParams } from "react-router-dom";
import marked from "marked";
import { SectionContainer } from "../Page/styles";

const TablePage: React.FC<{}> = () => {
	const { tab, category, subcategory } = useParams();
	const category_object = project[tab]?.subcategories?.[category];
	const item =
		subcategory && "subcategories" in category_object
			? category_object.subcategories[subcategory]
			: category_object;
	const description = item.description;

	function markedDescription() {
		return {
			__html: marked(description as string),
		};
	}

	return (
		<Page title={item.name}>
			{description && (
				<SectionContainer
					dangerouslySetInnerHTML={markedDescription()}
				/>
			)}
		</Page>
	);
};

export default TablePage;
