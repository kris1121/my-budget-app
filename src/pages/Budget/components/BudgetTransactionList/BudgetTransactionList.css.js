import styled from 'styled-components';

export const List = styled.ul`
   > li + li {
        margin-top: ${({ theme }) => theme.spacing.xs}px;
    }

    li {
        margin: 0;
    }
`;

export const ListItem = styled.li`
    border: 1px solid ${({ theme }) => theme.colors.gray.dark};
    padding: ${({ theme }) => theme.spacing.xs}px;
    display: flex;
    justify-content: space-between;

    > *:nth-child(1) {
        flex: 4;
    }
    > *:nth-child(2) {
        flex: 2;
    }
    > *:nth-child(3) {
        flex: 3;
    }
    > *:nth-child(4) {
        flex: 1;
    }
`