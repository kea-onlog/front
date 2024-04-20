import React from 'react';
import styled from 'styled-components';

import { SBold17, XSRegular16 } from '../style/Styled';

export const ProfileWrap = styled(SBold17)`
    display: flex;
    /* justify-content: center; */
    /* align-content: center; */
`;
export const ProfileProfileImg = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 2.5rem;
    background: ${props => `url(${props.$imgurl}) lightgray 50% / cover no-repeat`};
    flex-shrink: 0;
    margin-right: 0.94rem;
`;


export const ProfileTitleWrap = styled.div`
    display: flex;
    flex-direction: column;
    
    justify-content: center;
    align-content: center;
`;
export const ProfileTitle = styled.div`
    /* text-align: justify; */
    word-break: break-all;

`;
export const ProfileName = styled(XSRegular16)`
    color: var(--gray_bold, #4A4A4A);
    text-align: left;
`;

const UserProfile = ({item}) => {
    // console.log(item)
    return (
        <ProfileWrap>
            <ProfileProfileImg $imgurl={item.blogProfileImg}></ProfileProfileImg>
            <ProfileTitleWrap>
                <ProfileTitle>{item.blogName}</ProfileTitle>
                <ProfileName>@{item.blogNickname}</ProfileName>
            </ProfileTitleWrap>
        </ProfileWrap>
    );
};

export default UserProfile;
