import "styled-components";

declare module "styled-components" {
	export interface DefaultTheme {
		colors: {
			main: string;
			background: (elevation: number) => string;
		};
		text: {
			background: {
				high: string,
				medium: string,
				disabled: string,
				hover: string
			}
		};
		arguments: {
			background: string;
			color: string;
		}
		sideMenu: {
			background: string;
			active: string;
			text: string;
			hover: string;
			divider: string;
		};
		codeBlocks: {
			background: string;
			color: string;
			comment: string;
			punctuation: string;
			number: string;
			string: string;
			operator: string;
			keyword: string;
			function: string;
		}
	}
}
