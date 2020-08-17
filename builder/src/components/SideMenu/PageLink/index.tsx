import React from "react";
import { Container } from "./styles";
import { Link, useLocation } from "react-router-dom";

export interface PageLinkProps {
    label: string;
    link: string;
}

const PageLink: React.FC<PageLinkProps> = ({ label, link }) => {
    const location = useLocation()
    const active = location.pathname.startsWith(link)

	return (
        <Link to={link}>
            <Container active={active}>
                <span>{label}</span>
            </Container>
        </Link>
	);
};

export default PageLink;
