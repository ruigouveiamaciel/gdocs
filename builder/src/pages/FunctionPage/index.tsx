import React from "react";
import Page from "../Page";
import { useParams } from "react-router-dom";
import {
	project,
	FunctionPage as FunctionPageObject,
	FunctionParameters,
	FunctionReturns,
} from "../../util/parsed";
import function_name from "../../util/function_name";
import marked from "../../util/marked";
import { Section, SectionContainer } from "../Page/styles";
import { ParameterBox } from "./styles";
import get_types from "../../util/get_types";

const FunctionPage: React.FC<{}> = () => {
	const { tab, category, subcategory } = useParams();
	const category_object = project[tab]?.subcategories?.[category];
	const item = (subcategory && "subcategories" in category_object
		? category_object.subcategories[subcategory]
		: category_object) as FunctionPageObject;

	const [func_name, isMethod] = function_name(item.name);
	const title = isMethod ? `${category}:${func_name}` : func_name;

	const description = item.description;
	const examples: string[] = item.examples ?? [];
	const parameters: FunctionParameters[] = item.parameters ?? [];
	const returns: FunctionReturns[] = item.returns ?? [];

	function markedDescription() {
		return {
			__html: marked(description as string),
		};
	}

	function markedExamples() {
		return {
			__html: marked(examples.join("\n\n")),
		};
	}

	return (
		<Page title={title}>
			{description && (
				<>
					<Section>Description</Section>
					<SectionContainer
						dangerouslySetInnerHTML={markedDescription()}
					/>
				</>
			)}
			{parameters.length !== 0 && (
				<>
					<Section>Arguments</Section>
					<SectionContainer>
						{parameters.map((param, index) => (
							<ParameterBox>
								<p>
									{get_types(param.type)}{" "}
									<strong>{param.name}</strong>
								</p>
								<p
									dangerouslySetInnerHTML={{
										__html: marked(param.description),
									}}
								/>
								<span>{index + 1}</span>
							</ParameterBox>
						))}
					</SectionContainer>
				</>
			)}
			{returns.length !== 0 && (
				<>
					<Section>Returns</Section>
					<SectionContainer>
						{returns.map((ret, index) => (
							<ParameterBox>
								<p>{get_types(ret.type)}</p>
								<p
									dangerouslySetInnerHTML={{
										__html: marked(ret.description),
									}}
								/>
								<span>{index + 1}</span>
							</ParameterBox>
						))}
					</SectionContainer>
				</>
			)}
			{examples.length !== 0 && (
				<>
					<Section>Examples</Section>
					<SectionContainer
						dangerouslySetInnerHTML={markedExamples()}
					/>
				</>
			)}
		</Page>
	);
};

export default FunctionPage;
