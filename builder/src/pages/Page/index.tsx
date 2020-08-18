import React from "react";
import { Container } from "./styles"

export interface PageProps {
    children?: any;
}

const Page: React.FC<PageProps> = ({ children }) => {
    return (<Container>
        {children}
    </Container>)
}

export default Page