import styled from "styled-components";
import UserProfile from "../../components/common/UserProfile";
import { cardData } from "../../assets/datas/cardData";
import Profile from "../../assets/images/Profile.jpeg";
import { useState } from "react";
import CommentWrite from "./CommentWrite";

const ReplyComment = () => {
    const context = '그런데 나는 캡틴아메리카보다 아이언맨이 더 좋던데??? 의리남이잖아 ㅎㅎ';
    const date = '2023.10.18';
    const heart = '3';
    const [isClicked, setIsClicked] = useState(false);

    const buttonHandler = () => {
        setIsClicked(!isClicked);
    }

    return(
        <Wrap>
            <Wrap2>
                {/* <Profile>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="22" viewBox="0 0 26 22" fill="none">
                    <path d="M20.4678 12.3509H8.40267C5.35749 12.3509 2.88889 9.88227 2.88889 6.83709V0H0V6.83709C0 11.4049 3.70291 15.1078 8.27068 15.1078H20.4678L15.2967 20.0564L17.3333 22L26 13.7293L17.3333 5.45865L15.2967 7.40226L20.4678 12.3509Z" fill="#4A4A4A"/>
                </svg>
                    <UserProfile info={cardData}/>
                </Profile> */}

                <Menu>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 26 22" fill="none">
                        <path d="M20.4678 12.3509H8.40267C5.35749 12.3509 2.88889 9.88227 2.88889 6.83709V0H0V6.83709C0 11.4049 3.70291 15.1078 8.27068 15.1078H20.4678L15.2967 20.0564L17.3333 22L26 13.7293L17.3333 5.45865L15.2967 7.40226L20.4678 12.3509Z" fill="#4A4A4A"/>
                    </svg>
                    <ProfileImg style={{marginLeft:"1rem"}}></ProfileImg>
                    <TitleWrap>
                        <BlogName>Hani Tech World</BlogName>
                        <NickName>@hanitech</NickName>
                    </TitleWrap>
                </Menu>
                
                <Context style={{marginLeft:"1rem"}}> {context}</Context>
                <CommentFooter>
                    <CommentDate style={{marginLeft:"1rem"}}>{date}</CommentDate>
                    
                    <HeartReplyWrap>
                        <HeartWrap>
                                <HeartButton>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="15" viewBox="0 0 24 22" fill="none">
                                    <path d="M23 7.08001C23 3.72227 20.4472 1 17.2985 1C14.8933 1 12.8388 2.58809 12 4.83466C11.1623 2.58809 9.10669 1 6.70147 1C3.55278 1 1 3.72227 1 7.08001C1 8.23961 1.3042 9.32173 1.83201 10.2441C2.95573 12.7073 5.66402 16.3338 12 21C18.336 16.3338 21.0443 12.7073 22.168 10.2441C22.6958 9.32173 23 8.23961 23 7.08001Z" stroke="#4A4A4A" strokeWidth="2" strokeLinejoin="round"/>
                                    </svg>
                                </HeartButton>
                                <HeartNum> {heart} </HeartNum>
                        </HeartWrap>

                        <ReplyButton onClick={buttonHandler}> 답글달기 </ReplyButton>
                    </HeartReplyWrap>
                </CommentFooter>
            </Wrap2>

            {isClicked && <CommentWrite/>}
        </Wrap>
    );
};

export default ReplyComment;

const Wrap = styled.div`
margin-left: 2rem;
`
const Wrap2 = styled.div`
    display: flex;
    padding: 1rem 1rem 0rem 1rem;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: stretch;
    border-bottom: 1px solid var(--gray_lighter, #DCDCDC);
`
const Menu = styled.div`
    display: flex;
    align-items: center;
`;
const ProfileImg = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 2.5rem;
    background: url(${Profile}) lightgray 50% / cover no-repeat;
    margin-right: 0.94rem;
`;
const TitleWrap = styled.div`
text-decoration: none;
color: var(--black);
`;
const BlogName = styled.div`
    text-align: justify;

    color: var(--black, #000);
    text-align: justify;

    /* S-bold-25 */
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;
const NickName = styled.div`
    color: var(--gray_bold, #4A4A4A);
    text-align: justify;
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.03375rem;
`;
// 댓글 작성자 프로필
// const Profile = styled.div`
//     display: flex;
//     align-items: flex-start;
//     align-self: stretch;
// `

// 댓글 내용
const Context = styled.div`
    width: 50rem;
    align-self: stretch;
    color: var(--black, #000);
    padding: 1.25rem 1.25rem 0rem 1.25rem;

    /* S-regular-25 */
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

// 댓글 작성 날짜, 좋아요, 답장
const CommentFooter = styled.div`
    display: flex;
    justify-content: space-between;
    padding-left: 1.5rem;
    // align-items: flex-end;
    align-items: center;
    align-self: stretch;
`

const CommentDate = styled.div`
    color: var(--gray_bold, #4A4A4A);

    /* XS-semibold-20 */
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`
const HeartReplyWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 0.625rem;
`

const HeartWrap = styled.div`
    display: flex;
    width: 3rem;
    padding: 0.1875rem 1.25rem;
    align-items: center;
`
const HeartButton = styled.button`
    display: flex;
    width: 3rem;
    height: 3rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
`
const HeartNum = styled.div`
    color: var(--gray_bold, #4A4A4A);
    text-align: justify;

    /* XS-semibold-20 */
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`
const ReplyButton = styled.button`
    display: flex;
    padding: 0.5rem 1rem;
    align-items: center;
    color: var(--gray_bold, #4A4A4A);
    text-align: justify;
    background-color: transparent;
    border: 2px solid black;

    cursor: pointer;

    /* XS-semibold-20 */
    font-family: Pretendard;
    font-size: 0.8rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`