import React, { useState, useEffect } from "react";
import { Container, Head, Body } from "./styles";
import Icon from "@mdi/react";
import { mdiChevronRight } from "@mdi/js";
import PageLink from "../PageLink";
import { Link, useLocation } from "react-router-dom";


export interface SubcategoryProps {
	label: string;
	link: string;
	children?: React.ReactElement<typeof PageLink>[];
}

const Subcategory: React.FC<SubcategoryProps> = ({ label, children, link }) => {
	const location = useLocation()
	const [collapsed, setCollapsed] = useState(location.pathname.startsWith(link));
	const [active, setActive] = useState(false)

	useEffect(() => {
		setActive(link === location.pathname)
	}, [location, link])

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
			<Body collapsed={collapsed} count={children ? children.length : 0}>
				{children}
			</Body>
		</Container>
	);
};

export default Subcategory;
