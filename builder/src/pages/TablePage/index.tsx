import React from "react";
import Page from "../Page";
import { project, TablePage as TablePageObject } from "../../util/parsed";
import { useParams } from "react-router-dom";
import marked from "marked";
import { SectionContainer, Section, TableContainer } from "../Page/styles";
import get_types from "../../util/get_types";

const TablePage: React.FC<{}> = () => {
	const { tab, category, subcategory } = useParams();
	const category_object = project[tab]?.subcategories?.[category];
	const item = (subcategory && "subcategories" in category_object
		? category_object.subcategories[subcategory]
		: category_object) as TablePageObject;
	const description = item.description;
	const fields = item.fields ?? [];
	const realm = item.realm;

	function markedDescription() {
		return {
			__html: marked(
				(description as string) +
					(realm === "client" || realm === "server"
						? `\n\nThis enum is only available on the **${realm}side**.`
						: "")
			),
		};
	}

	return (
		<Page title={item.name}>
			{description && (
				<>
					<Section>Description</Section>
					<SectionContainer
						dangerouslySetInnerHTML={markedDescription()}
					/>
				</>
			)}
			{fields.length !== 0 && (
				<>
					<Section>Values</Section>
					<SectionContainer>
						<TableContainer>
							<table>
								<tbody>
									{fields.map((field, index) => (
										<tr
											key={`${index}-${field.key}--${field.type}`}
										>
											<td>{get_types(field.type)}</td>
											<td>{field.key}</td>
											<td>{field.description}</td>
										</tr>
									))}
								</tbody>
							</table>
						</TableContainer>
					</SectionContainer>
				</>
			)}
		</Page>
	);
};

export default TablePage;
