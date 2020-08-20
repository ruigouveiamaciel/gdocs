import React from "react";
import Page from "../Page";
import { useParams } from "react-router-dom";
import { project, Category } from "../../util/parsed";
import { SectionContainer, Section, TableContainer } from "../Page/styles";
import marked from "marked";
import get_types from "../../util/get_types";

const CategoryPage: React.FC<{}> = () => {
	const { tab, category } = useParams();
	const category_object = project[tab]?.subcategories?.[category] as Category;
	const description = category_object.description;
	const fields = category_object.fields ?? []

	function markedDescription() {
		return {
			__html: marked(description as string),
		};
	}

	return (
		<Page title={category}>
			{description && (
				<>
					<Section>Description</Section>
					<SectionContainer
						dangerouslySetInnerHTML={markedDescription()}
					/>
				</>
			)}
			{fields.length !== 0 && <>
				<Section>Attributes</Section>
				<SectionContainer>
					<TableContainer>
						<table>
							<tbody>
								{fields.map((field, index) => <tr key={`${index}-${field.key}--${field.type}`}>
									<td>{get_types(field.type)}</td>
									<td>{field.key}</td>
									<td>{field.description}</td>
								</tr>)}
							</tbody>
						</table>
					</TableContainer>
				</SectionContainer>
			</>}
		</Page>
	);
};

export default CategoryPage;
