import { DefaultTheme } from "styled-components";

export const light: DefaultTheme = {
	colors: {
		main: "#3498db",
		background: (level: number) => level > 0 ? "#FFF" : "#f5f5f5"
	},
	text: {
		background: {
			high: "rgba(0, 0, 0, 0.83)",
			medium: "rgba(0, 0, 0, 0.6)",
			disabled: "rgba(0, 0, 0, 0.38)",
			hover: "rgba(0, 0, 0, 0.04)"
		}
	},
	sideMenu: {
		background: "#263238",
		active: "#37474F",
		text: "rgba(255, 255, 255, 0.83)",
		hover: "rgba(255, 255, 255, 0.04)",
		divider: "rgba(255, 255, 255, 0.3)"
	}
};
