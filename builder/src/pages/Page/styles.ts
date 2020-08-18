import styled from "styled-components";

export const Container = styled.main`
	background: ${({ theme }) => theme.colors.background(2)};
	width: 100%;
	max-width: 72rem;

	box-shadow: 0px 0px 1px -2px rgba(0, 0, 0, 0.2),
		0px 0px 2px 0px rgba(0, 0, 0, 0.14), 0px 0px 5px 0px rgba(0, 0, 0, 0.12);
`;
