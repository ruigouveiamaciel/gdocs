import styled from "styled-components"

export const ParameterBox = styled.div`
    position: relative;
    margin-bottom: 3.2rem;

    > span {
        position: absolute;
        left: 0;
        top: 0;
        height: 1.8rem;
        width: 2.8rem;
        text-align: center;
        line-height: 1.8rem;
        font-weight: 500;
        background: ${({ theme }) => theme.arguments.background};
        color: ${({ theme }) => theme.arguments.color};
        user-select: none;
        border-radius: 0.4rem 0 0 0.4rem;
        font-size: 1.4rem;
    }

    > p {
        margin-left: 3.2rem;
    }

`
