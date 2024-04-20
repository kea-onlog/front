import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SBold192 } from '../../components/style/Styled';
import { Delete_Follow, Get_follow, Post_follow } from '../../apis/API_Subs';

const SubscribeCheck = ({params}) => {
    const [subCheck, setSubCheck] = useState(false); // true이면 구독한 상태
    const [hovered, setHovered] = useState(false); // hover 상태 여부

    useEffect(() => {
        // 특정 유저의 팔로우 여부 API가 없기 때문에 하나씩 id를 비교해서 팔로우 여부를 알아야 하는 상황         
        const fetchData = async () => {
            const response = await Get_follow();
            const match = response.data.some(item => {
                if (item.followId === params) {
                    return item.following === true;
                }
                return false;
            });
            console.log("match:", match);
            setSubCheck(match); 
            
        };
        fetchData();
    },[params])


    const handleClick = async (e) => {
        e.preventDefault();

        if(subCheck) {
            // await Delete_Follow(params);
            const response = await Delete_Follow(params);
            console.log(response)

            if (response.success) {
                console.log("구독 취소 완료");
                setSubCheck(false);

            } else {
                console.error("구독취소 실패", response.message);
            }
        } else {
            setSubCheck(true);
            await Post_follow(params);
        }
    };

    return (
        <>  
            <Button 
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={handleClick}
                // subCheck={subCheck}
            >
                {hovered ? (subCheck ? "구독 취소" : "구독하기") : (subCheck ? "구독 중" : "구독하기")}
            </Button>
        </>
    );
};

export default SubscribeCheck;

const Button = styled(SBold192).attrs({as:'button'})`
    display: flex;
    padding: 0.75rem 6.03125rem;
    align-items: center;
    gap: 0.9375rem;
    background: var(--black, #000);
    border: 4px solid black;
    cursor: pointer;
    color: var(--white, #FFF);
    text-align: justify;

    &:hover{
        background: white;
        color: black;
        transition: 0.3s;
    }
    &:active{
        transform: scale(0.95);
    }
`;
