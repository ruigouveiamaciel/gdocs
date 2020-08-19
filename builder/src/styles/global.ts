import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
	:root {
		font-size: 62.5%
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	a {
		text-decoration: none;
	}

	html, body, #root {
		height: 100vh;
	}

	body {
		font-family: 'Roboto', sans-serif;
		font-size: 1.6rem;
		font-weight: normal;
		letter-spacing: 0.05rem;
		color: ${({ theme }) => theme.text.background.high};
		background: ${({ theme }) => theme.colors.background(0)};
	}

	#root {
		display: flex;
		align-items: center;
		justify-content: center;
	}
`
