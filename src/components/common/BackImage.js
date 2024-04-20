import React from 'react';
import {ReactComponent as Vector} from '../../assets/images/background/Vector.svg';
import {ReactComponent as RVector} from '../../assets/images/background/RVector.svg';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const BackImage = () => {
    const color = useSelector(state => state.color);
    // console.log(color.color);

    return (
        <Wrap>
            <Back color={color.color}/>
            <Back2 color={color.color}/>
        </Wrap>
    );
};

export default BackImage;

// 뒷배경
const Wrap = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
`;
const Back = styled(Vector)`
    position: absolute;
    top: 15rem;
    right: 55rem;
    color: ${props => `var(${props.color})`};
`;
const Back2 = styled(RVector)`
    position: absolute;
    top: 37rem;
    left: 55rem;
    color: ${props => `var(${props.color})`};
`;