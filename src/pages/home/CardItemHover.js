import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { SBold17, XSRegular16 } from '../../components/style/Styled';
import Arrow from '../../assets/images/Icons/Arrow.png';

const CardItemHover = ({item}) => {
    // console.log(item.thumbnailLink);
    const navigate = useNavigate();

    const handleReadBtnClick = (e) => {
        // e.preventDefault();
        console.log('hover postId: ',item.postId);

        navigate(`/postview/${item.postId}`);
    };
    
    return (
        <HoverWrap onClick={handleReadBtnClick}>
            <Wrap>
                <Photo $imgurl = {item.thumbnailLink}></Photo>
                <Contents dangerouslySetInnerHTML={{__html: item.summary}}/>
                <ReadWrap>
                   <p>Read</p> 
                   <img src={Arrow} alt="arrow" /> 
                </ReadWrap>
            </Wrap>
        </HoverWrap>
    );
};

export default CardItemHover;

const HoverWrap = styled.button`
    /* width: 23.0625rem;
    height: 37.5625rem; */
    width: 15.1875rem;
    height: 23.625rem;
    /* padding: 1.875rem 2.5rem; */
    padding: 1.875rem 1rem 1rem 1rem;
    box-sizing: border-box;

    background-color: var(--black);
    border-radius: 1.875rem;

    cursor: pointer;

    &:active{
        transform: scale(0.95);
    }
`;

const Wrap = styled.div`
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 0.94rem;
`;
    

const Photo = styled.div`
width: 8.125rem;
height: 8.125rem;
    background: ${props => `url(${props.$imgurl}) lightgray 50% / cover no-repeat`};
`;
const Contents = styled(XSRegular16)`

    color: var(--white);

    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 5; /* 원하는 라인 수 */
    -webkit-box-orient: vertical;
    overflow: hidden;

    line-height: 1.5;

`;
const ReadWrap = styled(SBold17)`
    color: var(--white, #FFF);
    border: none;
    border-top: 1px solid var(--gray_bold, #4A4A4A);
    background: none;
    cursor: pointer;
    display: flex;
    gap: 0.62rem;
    align-items: center;
    justify-content: center;
    padding: 0.625rem 0rem 0.375rem 1.5rem;
    align-self: stretch;

    &:hover{
        // color: red;
    }
    &:active{
        transform: scale(0.95);
    }
`;
