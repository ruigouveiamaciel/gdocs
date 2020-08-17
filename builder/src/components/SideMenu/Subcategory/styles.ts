import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	justify-content: center;
`;

export interface HeadProps {
	collapsed: boolean;
	active?: boolean;
}

export const Head = styled.div<HeadProps>`
	height: 4rem;
	display: flex;
	align-items: center;
	color: ${({ theme, active }) =>
		active ? theme.colors.main : theme.text.background.high};
	cursor: pointer;
	transition: background 250ms cubic-bezier(0.4, 0, 0.2, 1),
		color 250ms cubic-bezier(0.4, 0, 0.2, 1);

	:hover {
		background: ${({ theme }) => theme.text.background.hover};
	}

	svg {
		width: 2.4rem;
		height: 2.4rem;
		margin: 0 2rem 0 2rem;
		transform: rotate(${({ collapsed }) => (collapsed ? "90" : "0")}deg);
		transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
	}

	span {
		font-family: Roboto;
		font-weight: 500;
		font-size: 14px;
		line-height: 24px;
		letter-spacing: 0.1px;
		user-select: none;
	}
`;

export interface BodyProps {
	collapsed?: boolean;
	count: number;
}

export const Body = styled.div<BodyProps>`
	margin-bottom: ${({ collapsed }) => (collapsed ? "1.2rem" : "0")};
	max-height: ${({ collapsed, count }) =>
		collapsed ? String(3.2 * count) + "rem" : "0"};
	overflow-y: hidden;
	transition: max-height 250ms cubic-bezier(0.4, 0, 0.2, 1),
		margin-bottom 250ms cubic-bezier(0.4, 0, 0.2, 1);
`;
