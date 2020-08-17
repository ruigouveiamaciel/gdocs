import React, { useState } from "react";
import { Container, Head, Body } from "./styles";
import Icon from "@mdi/react";
import { mdiChevronRight } from "@mdi/js";
import PageLink, { PageLinkProps } from "../PageLink";
import { Link, useLocation } from "react-router-dom";


export interface SubcategoryProps {
	label: string;
	link: string;
	content: PageLinkProps[];
}

const Subcategory: React.FC<SubcategoryProps> = ({ label, content, link }) => {
	const location = useLocation()
	const [collapsed, setCollapsed] = useState(location.pathname.startsWith(link));
    const active = link.startsWith(location.pathname)

	return (
		<Container>
			<Link to={link}>
				<Head
					collapsed={collapsed}
					onClick={() => {
						setCollapsed(!collapsed);
					}}
					active={active}
				>
					<Icon path={mdiChevronRight} />
					<span>{label}</span>
				</Head>
			</Link>
			<Body collapsed={collapsed} count={content ? content.length : 0}>
				{content.map((item) => (
					<PageLink key={item.label} {...item} />
				))}
			</Body>
		</Container>
	);
};

export default Subcategory;
