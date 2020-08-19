import styled from "styled-components";

export interface ContainerProps {
	active?: boolean;
}

export const Container = styled.div<ContainerProps>`
	height: 3.2rem;
	display: flex;
	align-items: center;
	padding-left: 6.4rem;
	color: ${({ theme, active }) =>
		active ? theme.colors.main : theme.text.background.medium};
	cursor: pointer;
	transition: background 250ms cubic-bezier(0.4, 0, 0.2, 1),
		color 250ms cubic-bezier(0.4, 0, 0.2, 1);

	:hover {
		background: ${({ theme }) => theme.text.background.hover};
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
