import React from "react";
import { ThemeProvider } from "styled-components";
import { light } from "../../styles/themes/light";
import { GlobalStyles } from "../../styles/global";
import SideMenu from "../SideMenu";
import { Container, Content } from "./styles";

const App: React.FC = () => {
	return (
		<ThemeProvider theme={light}>
			<GlobalStyles />
			<Container>
				<SideMenu />
				<Content>

				</Content>
			</Container>
		</ThemeProvider>
	);
};

export default App;
