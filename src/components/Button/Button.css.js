import styled from "styled-components";

const RootButton = styled.button`
    color: ${({ theme: { colors }, primary }) => primary ? colors.gray.light : colors.pink.normal};
    cursor: inherit;
    border: none;
    background-color: transparent;
    cursor: ${props => props.to || props.onClick || props.type === 'submit' ? 'pointer' : 'default'};

    &:hover {
        opacity: .8;
    }
`;

export const InlineButton = styled(RootButton)`
    &:hover {
        text-decoration: underline;
    }
`

export const RegularButton = styled(RootButton)`
    background: ${({ theme: { colors }, primary }) => primary ? colors.pink.normal : colors.gray.light};
    margin: ${({ theme }) => `${theme.spacing.xs / 2}px`};
    padding: ${({ theme }) => `${theme.spacing.xs / 2}px`};
    border: ${({ theme }) => `2px solid ${theme.colors.pink.normal}`};
    border-radius: 3px;
`