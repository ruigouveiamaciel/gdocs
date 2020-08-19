import React from "react";
import Page from "../Page";
import { useParams } from "react-router-dom";
import { project } from "../../util/parsed";
import { SectionContainer } from "../Page/styles";
import marked from "marked";

const CategoryPage: React.FC<{}> = () => {
	const { tab, category } = useParams();
	const category_object = project[tab]?.subcategories?.[category];
	const description = category_object.description;

	function markedDescription() {
		return {
			__html: marked(description as string),
		};
	}

	return (
		<Page title={category}>
			{description && (
				<SectionContainer
					dangerouslySetInnerHTML={markedDescription()}
				/>
			)}
		</Page>
	);
};

export default CategoryPage;
