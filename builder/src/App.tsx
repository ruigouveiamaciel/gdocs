import React from "react";
import { ThemeProvider } from "styled-components";
import { light } from "./styles/themes/light";
import { GlobalStyles } from "./styles/global";

const App: React.FC = () => {
	return (
		<ThemeProvider theme={light}>
			<GlobalStyles />
			derp
		</ThemeProvider>
	);
};

export default App;
