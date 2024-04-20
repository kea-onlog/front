import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import UserProfile from '../../components/common/UserProfile';
import { LSemibold40, XSSemibold16, SBold17, SBold192 } from '../../components/style/Styled';
import {ReactComponent as Heart} from '../../assets/images/Icons/Heart.svg';
import {ReactComponent as Comment} from '../../assets/images/Icons/Comment.svg';
import CardItemHover from './CardItemHover';
import SkeletonItem from './SkeletonItem';

const CardItem = ({item}) => {
    // const specificData = useSelector(state => state.cards.cards); 
    // const item = useSelector(state => state.cards.cards.find(card => card.postId === postId));
    // const item = data;

    const profileInfo = {
        blogName: item.writer.blogName,
        blogNickname: item.writer.blogNickname,
        blogProfileImg: item.writer.blogProfileImg
    };
    const hoverInfo = {
        thumbnailLink: item.thumbnailLink,
        summary: item.summary,
        postId: item.postId
    }

    const [isHovering, setIsHovering] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    //Loading skeleton animation
    useEffect(() => {
        if (item) {
            setIsLoading(false);
        }
    }, [item]);

    return (
        <PageWrap
            onMouseOver={() => setIsHovering(1)}
            onMouseOut={() => setIsHovering(0)} 
        >
            
            {!isHovering ? (
                <Wrap>
                    {isLoading ? (
                        <SkeletonItem/>
                    ) : (
                        <>
                            <UserProfile item={profileInfo}/>
        
                            <TextWrap>
                                <Title>{item.title}</Title>
                            </TextWrap>
                            <DateWrap>{new Date(item.createdAt).toISOString().split('T')[0].replace(/-/g, '.')}</DateWrap>
                            <Second>
                                <Icon>
                                    <Heart style={{paddingRight:"1rem"}}/>
                                    <p>{item.likesCount}</p>
                                </Icon>
                                <Icon>
                                    <Comment style={{paddingRight:"1rem"}}/>
                                    <p>{item.commentsCounts}</p>
                                </Icon>
                            </Second>
                        </>
                    )}  
                </Wrap>
            ) : (
                <CardItemHover key={item.postId} item={hoverInfo}/>
            )}

        </PageWrap>

        
    );
};

export default CardItem;

const PageWrap = styled.div`
    
`;
const Wrap = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    width: 15.1875rem;
    height: 23.625rem;
    padding: 1.875rem 1.25rem;
    box-sizing: border-box;
    
    // box style
    border-radius: 1.875rem;
    border: 0.5px solid var(--gray_bold, #4A4A4A);
    background: rgba(255, 255, 255, 0.70);
    box-shadow: 6px 7px 7px 0px rgba(0, 0, 0, 0.50);
`;

export const TextWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
`;
export const Title = styled(SBold192)`
    color: var(--black);
    word-break: break-all;

    display: -webkit-box;
    -webkit-line-clamp: 4; /* 원하는 라인 수 */
    -webkit-box-orient: vertical;
    overflow: hidden;

`;
export const DateWrap = styled(XSSemibold16)`
    color: var(—gray_bold, #4A4A4A);

`;
export const Category = styled(LSemibold40)`
    color: var(—gray_bold, #4A4A4A);
`;
export const Second = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
`;
export const Icon = styled(SBold17)`
    display: flex;
    align-items: center;
    justify-content: center;

    p  {
        font-size: 1.0625rem;

    }
`;


