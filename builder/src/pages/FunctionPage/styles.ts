import styled from "styled-components"

export const ParameterBox = styled.div`
    position: relative;
    margin-bottom: 2.4rem;

    > span {
        position: absolute;
        left: 0;
        top: 0;
        height: 1.8rem;
        width: 2.8rem;
        text-align: center;
        line-height: 1.8rem;
        font-weight: 700;
        background: ${({ theme }) => theme.arguments.background};
        color: ${({ theme }) => theme.arguments.color};
        user-select: none;
        border-radius: 0.45rem 0.1rem 0.1rem 0.45rem;
        font-size: 1.4rem;
    }

    > p:first-child {
        font-weight: 500;
    }

    > p {
        margin-left: 3.8rem;
    }

`
