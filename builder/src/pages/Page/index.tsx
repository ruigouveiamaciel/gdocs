import React, { useEffect } from "react";
import { Container, Title } from "./styles";

export interface PageProps {
	children?: any;
	title?: string;
}

const Page: React.FC<PageProps> = ({ children, title }) => {
	/* Fix code blocks missing the correct class on the pre element. */
	useEffect(() => {
		Array.from(document.getElementsByTagName("code")).forEach((child) => {
			let parent = child.parentElement;
			if (parent && parent.nodeName.toLowerCase() === "pre") {
				parent.className = child.className;
			}
		});
	});

	return (
		<Container>
			{title && <Title>{title}</Title>}
			{children}
		</Container>
	);
};

export default Page;
