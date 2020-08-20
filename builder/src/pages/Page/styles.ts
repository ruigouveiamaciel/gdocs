import styled from "styled-components";

export const Container = styled.main`
	background: ${({ theme }) => theme.colors.background(2)};
	width: 100%;
	max-width: 90rem;
	padding: 2.4rem 3.2rem 1.6rem 3.2rem;

	box-shadow: 0px 0px 1px -2px rgba(0, 0, 0, 0.2),
		0px 0px 2px 0px rgba(0, 0, 0, 0.14), 0px 0px 5px 0px rgba(0, 0, 0, 0.12);

	a {
		color: ${({ theme }) => theme.colors.main};
		font-weight: 700;
	}
`;

export const Title = styled.h4`
	font-family: Roboto;
	font-weight: 500;
	font-size: 3.4rem;
	letter-spacing: 0.025rem;
	line-height: 4.8rem;
	text-align: center;
	color: ${({ theme }) => theme.colors.main};
	margin-bottom: 0.8rem;
	border-bottom: 3px solid ${({ theme }) => theme.colors.main};
	user-select: none;
`;

export const Section = styled.h5`
	font-family: Roboto;
	font-weight: 500;
	font-size: 2.4rem;
	letter-spacing: 0;
	line-height: 2.8rem;
	color: ${({ theme }) => theme.colors.main};
	margin-bottom: 0.8rem;
	margin-top: 6.4rem;
	border-bottom: 3px solid ${({ theme }) => theme.colors.main};
	user-select: none;
`;

export const SectionContainer = styled.div`
	margin: 0.8rem 0;
	padding: 0.8rem 0;

	p {
		margin: 0.8rem 0;
		font-size: 1.6rem;
		line-height: 1.8rem;
	}

	code[class*="language-"],
	pre[class*="language-"] {
		color: ${({ theme }) => theme.codeBlocks.color};
		text-shadow: none;
		font-family: "Roboto Mono", monospace;
		font-size: 1.6rem;
		font-weight: 400;
		line-height: 1.8rem;
	}

	/* Code blocks */
	pre[class*="language-"] {
		padding: 1.6rem;
		margin: 1.2rem 0;
	}

	:not(pre) > code[class*="language-"],
	pre[class*="language-"] {
		background: ${({ theme }) => theme.codeBlocks.background};
	}

	/* Inline code */
	:not(pre) > code[class*="language-"] {
		padding: 0.2rem;
		border-radius: 0.2rem;
	}

	.token.comment,
	.token.prolog,
	.token.doctype,
	.token.cdata {
		color: ${({ theme }) => theme.codeBlocks.comment};
	}

	.token.punctuation {
		color: ${({ theme }) => theme.codeBlocks.punctuation};
	}

	.token.property,
	.token.tag,
	.token.boolean,
	.token.number,
	.token.constant,
	.token.symbol,
	.token.deleted {
		color: ${({ theme }) => theme.codeBlocks.number};
	}

	.token.selector,
	.token.attr-name,
	.token.string,
	.token.char,
	.token.builtin,
	.token.inserted {
		color: ${({ theme }) => theme.codeBlocks.string};
	}

	.token.operator,
	.token.entity,
	.token.url,
	.language-css .token.string,
	.style .token.string {
		color: ${({ theme }) => theme.codeBlocks.operator};
		background: none;
	}

	.token.atrule,
	.token.attr-value,
	.token.keyword {
		color: ${({ theme }) => theme.codeBlocks.keyword};
	}

	.token.function,
	.token.class-name {
		color: ${({ theme }) => theme.codeBlocks.function};
	}
`;

export const TableContainer = styled.div`
    width: 100%;

    table {
        width: 100%;
        border-collapse: collapse;
		background: ${({ theme }) => theme.table.background};
		table-layout: fixed;
    }

    td {
        padding: 0.6rem 1.2rem;
		border: 3px solid ${({ theme }) => theme.colors.background(2)};
		word-wrap: break-word;
    }

    td:nth-child(1), td:nth-child(2) {
		width: 25%;
    }

    td:nth-child(1) {
        border-left: none;
    }

    td:nth-child(3) {
        border-right: none;
    }

    tr:nth-child(2n) {
        background: ${({ theme }) => theme.table.alternative};
    }
`;
