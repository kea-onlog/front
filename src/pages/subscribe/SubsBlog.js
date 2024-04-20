import styled from "styled-components";
import BlogItem from "../../components/common/BlogItem";
import { MRegular32, LBold32 } from "../../components/style/Styled";
import { Get_follow } from "../../apis/API_Subs";
import { useState, useEffect } from "react";

const SubsBlog = () => {
    const [totalBlog, setTotalBlog] = useState("");
    const [followList, setFollowList] = useState([]);

    useEffect(() => {
        window.scrollTo({top:0, behavior:"smooth"});

        const fetchFollow = async () => {
            const response = await Get_follow();
            if (response.success) {
                console.log("구독 리스트 조회 성공", response.data);
                setTotalBlog(response.data.filter(item=>item.following).length);
                setFollowList(response.data);
            } else {
                console.error("구독 리스트 조회 실패", response.message);
            }
        }
        fetchFollow();
      }, []);

    return(
        <div style={{paddingBottom:"6rem"}}>
            <Wrap>
                <Left> 구독 중인 블로그 </Left>
                <Right><Num>{totalBlog}</Num>명</Right>
            </Wrap>
            <PageWrap>
                {/* 구독상태가 true인 경우에만 mapping */}
                {followList.filter(item => item.following).map(item => (
                    <BlogItem key={item.followId} blogId={item.followId} isSubs={item.following} />
                ))}
            </PageWrap>
        </div>
    );
};

export default SubsBlog;

const PageWrap = styled.div`
    margin: 0rem 6.25rem;
    /* box-sizing: border-box; */

/* 
    @media ${({ theme }) => theme.windowSize.test} {
        background-color: pink;
    } */
`
const Wrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    padding: 2.5rem 7rem 0rem 7rem;
`
const Left = styled(MRegular32)`
    display: flex;
    padding: 1.25rem 0rem;
    align-items: flex-start;
    gap: 0.625rem;

    color: var(--black, #000);
`
const Right = styled.div`
    display: flex;
    padding: 1.25rem 0rem;
    align-items: center;
    gap: 0.375rem;

    color: var(--gray_bold, #4A4A4A);

    /* M-regular-38 */
    font-family: Pretendard;
    font-size: 2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 3.01875rem; /* 127.105% */
`
const Num = styled(LBold32)`
    color: var(--black, #000);
`