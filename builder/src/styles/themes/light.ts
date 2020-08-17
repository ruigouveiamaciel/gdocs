import { DefaultTheme } from "styled-components";

export const light: DefaultTheme = {
	colors: {
		main: "cyan",
		background: (level: number) => level > 0 ? "#FFF" : "#EEE"
	},
	sideMenu: {
		background: "#263238",
		active: "#37474F",
		text: "rgba(255, 255, 255, 0.87)",
		hover: "rgba(255, 255, 255, 0.08)"
	}
};
