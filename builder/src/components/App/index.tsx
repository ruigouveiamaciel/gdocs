import React from "react";
import { ThemeProvider } from "styled-components";
import { light } from "../../styles/themes/light";
import { GlobalStyles } from "../../styles/global";
import SideMenu from "../SideMenu";
import { Container, Content } from "./styles";
import FunctionPage from "../../pages/FunctionPage";

const App: React.FC = () => {
	return (
		<ThemeProvider theme={light}>
			<GlobalStyles />
			<Container>
				<SideMenu />
				<Content>
					<FunctionPage />
				</Content>
			</Container>
		</ThemeProvider>
	);
};

export default App;
