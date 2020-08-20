import { DefaultTheme } from "styled-components";

const backgroundPalette = [
    "rgb(28, 33, 36)",
    "rgb(34, 41, 47)",
    "rgb(35, 43, 50)",
    "rgb(37, 46, 53)",
    "rgb(38, 48, 55)",
    "rgb(40, 50, 58)",
    "rgb(41, 52, 60)",
    "rgb(42, 53, 62)",
    "rgb(43, 55, 64)"
]

export const dark: DefaultTheme = {
	colors: {
		main: "rgb(144, 202, 249)",
		background: (level: number) => backgroundPalette[level]
	},
	text: {
		background: {
			high: "rgba(255, 255, 255, 0.83)",
			medium: "rgba(255, 255, 255, 0.6)",
			disabled: "rgba(255, 255, 255, 0.38)",
			hover: "rgba(255, 255, 255, 0.04)"
		}
	},
	arguments: {
		background: "rgb(144, 202, 249)",
		color: backgroundPalette[2]
	},
	sideMenu: {
		background: backgroundPalette[8],
		active: "rgba(255, 255, 255, 0.12)",
		text: "rgba(255, 255, 255, 0.83)",
		hover: "rgba(255, 255, 255, 0.04)",
		divider: "rgba(255, 255, 255, 0.3)"
	},
	codeBlocks: {
		background: backgroundPalette[6],
		color: "rgba(255, 255, 255, 0.83)",
		comment: "#95a5a6",
		punctuation: "#95a5a6",
		number: "#f39c12",
		string: "#1abc9c",
		operator: "#e74c3c",
		keyword: "#9b59b6",
		function: "#9b59b6"
	}
};
