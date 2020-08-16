import { DefaultTheme } from "styled-components";

export const light: DefaultTheme = {
	colors: {
		main: "cyan",
		background: (level: number) => level > 0 ? "#fff" : "#eee"
	},
};
