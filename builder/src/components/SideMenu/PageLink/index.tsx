import React, { useEffect, useState } from "react";
import { Container } from "./styles";
import { Link, useLocation } from "react-router-dom";

export interface PageLinkProps {
    label: string;
    link: string;
    onClick?: () => void;
}

const PageLink: React.FC<PageLinkProps> = ({ label, link, onClick }) => {
    const location = useLocation()
    const [active, setActive] = useState(false)

    useEffect(() => {
        setActive(location.pathname === link)
    }, [location, link])

	return (
        <Link to={link}>
            <Container active={active} onClick={onClick}>
                <span>{label}</span>
            </Container>
        </Link>
	);
};

export default PageLink;
