import React from 'react';
import styled from 'styled-components';
import TopBtn from '../../assets/images/Icons/TopBtn.png';
const ScrollTop = () => {
    return (
        <div>
            <Btn></Btn>
        </div>
    );
};

export default ScrollTop;

const Btn = styled.button`
    background: url(${TopBtn});
    width: 6.25rem;
    height: 6.25rem;
    position: absolute;
    right: 3.1875rem;
    bottom: 18.875rem;

`;