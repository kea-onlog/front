import React from 'react';
import { SMedium34 } from '../style/Styled';
import styled from 'styled-components';

const Footer = () => {
    return (
        <Wrap>
           © Onlog 
        </Wrap>
    );
};

export default Footer;

const Wrap = styled(SMedium34)`
    display: flex;
    padding: 12.5rem 6.25rem 4.375rem 6.25rem;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;

    color: var(--black, #000);
`;
