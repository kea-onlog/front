import styled, {keyframes} from "styled-components";
import { SBold192, SRegular192,XSSemibold16, XSRegular16 } from '../style/Styled';
import { useState } from "react";
import Profile from "../../assets/images/Profile.jpeg"
// import Swal from "sweetalert2";


const NoticeItem = (props) => {


    // const [noticeType, setNoticeType] = useState(props.data); // 알림 구분 - 구독여부, 좋아요, 댓글여부
    const {noticeType, user, postTitle, isReply, comment} = props;
    const [isSubscribed, setSubscribed] = useState(false); // 구독 상태를 저장하는 state
    const [isHovered, setHovered] = useState(false); // Hover 상태를 저장하는 state
    const [isLoading, setLoading] = useState(true); // 데이터 로딩 상태를 저장하는 state (skeleton)
    
    // const alarmData = [
    //     {
    //         id:0,
    //         name: "subscribed",
    //     },
    //     {
    //         id:1,
    //         name: "postLike",
    //     },    
    //     {
    //         id:2,
    //         name: "commentLike",
    //     },
    //     {
    //         id:3,
    //         name: "comment",
    //     },   
    // ]

    setTimeout(() => {
        setLoading(false);
    }, 2000);


    const handleSubscribe = (e) => {
        setSubscribed(!isSubscribed); // 현재의 반대 값으로 설정

        // Swal.fire({
        //     title: isSubscribed ? "구독 취소" : "구독 완료",
        //     html: isSubscribed ? "구독이 취소되었습니다!" : "구독이 완료되었습니다!",
        //     // icon: 'success'
        // });
    }

    return(
        <>
        {isLoading ? (
                // Loading중이면 skeleton 효과
                <Wrap> 
                    <LeftWrap>
                        <Top>
                            <ProfileImg style={{background:"none"}}>
                                <SkeletonItem width="3.2rem" height="3.2rem" $borderRadius="2.5rem"/>
                            </ProfileImg>
                            <TitleWrap>
                                <NickName><SkeletonItem width="40rem" height="2.3rem"/></NickName>
                                <NoticeType><SkeletonItem width="10rem" height="1.5rem"/></NoticeType>
                            </TitleWrap>
                        </Top>
                    </LeftWrap>
                </Wrap>
            ) : (
                // loading중 아니라면 제대로 보여주기
                <>

                {/* 구독 알림일 때 */}
                {noticeType==="subscribed" && (
                    <Wrap>
                        <LeftWrap>
                            <Top>
                                <ProfileImg></ProfileImg>
                                <NickName>{`@${user}`}</NickName>
                                <NoticeType>님이 나를 구독했습니다. </NoticeType>
                            </Top>
                            <Date> 2023.10.25 </Date>
                            <SubscribeWrap 
                            onClick={handleSubscribe} 
                            $isSubscribed={isSubscribed}
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                        >
                        {isHovered ? (isSubscribed ? "구독 취소" : "구독하기") : (isSubscribed ? "구독 중" : "구독하기")}
                        </SubscribeWrap>
                        </LeftWrap>

                    </Wrap>
                )}

                {/* 게시글 좋아요 알림일 때 */}
                {noticeType==="postLike" && (
                    <Wrap>
                        <LeftWrap>
                            <Top>
                                <ProfileImg></ProfileImg>
                                <NickName>{`@${user}`}</NickName> 님이
                                <PostTitle>{`"${postTitle}"`}</PostTitle>
                                <NoticeType>를 좋아합니다.</NoticeType>
                            </Top>
                            <Date> 2023.10.25 </Date>
                        </LeftWrap>
                    </Wrap>
                )}

                {/* 댓글 좋아요 알림일 때 */}
                {noticeType==="commentLike" && (
                    <Wrap>
                        <LeftWrap>
                            <Top>
                                <ProfileImg></ProfileImg>
                                <NickName>{`@${user}`}</NickName> 님이
                                <PostTitle>{`"${postTitle}"`}</PostTitle>
                                의
                                <PostTitle>{`"${comment}"`}</PostTitle>
                                <NoticeType>를 좋아합니다.</NoticeType>
                            </Top>
                            <Date> 2023.10.25 </Date>
                        </LeftWrap>
                    </Wrap>
                )}

                    {/* 댓글 달린 거 알림일 때 */}
                    {noticeType==="comment" && (
                        <Wrap>
                            <LeftWrap>
                                <Top>
                                    <ProfileImg></ProfileImg>
                                    <NickName>{`@${user}`}</NickName> 님이
                                    <PostTitle>{`"${postTitle}"`}</PostTitle>
                                    {/* 댓글이면 댓글, 대댓글이면 '답글'로 출력 */}
                                    <NoticeType>에 {isReply === 0 ? '댓글' : '답글'}을 남겼습니다.</NoticeType>
                                </Top>
                                {/* <CommentWrap>{`${comment}`}</CommentWrap> */}
                                <Date> 2023.10.25 </Date>
                            </LeftWrap>
                            <CommentWrap>{`${comment}`}</CommentWrap>

                        </Wrap>
                )}
            </>
            )}
        </>
    );
};

export default NoticeItem;

const Wrap = styled.div`
    display: flex;
    padding: 0.9375rem 0rem;
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;
    flex-direction: column;
    border-bottom: 1px solid var(--gray_light, #939393);
`

const LeftWrap = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.625rem;
    // flex: 1;

`
const Top = styled(SRegular192)`
    display: flex;
    align-items: center;
    color: var(--black, #000);
    text-align: justify;
`;
const ProfileImg = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 2.5rem;
    background: url(${Profile}) lightgray 50% / cover no-repeat;
    margin-right: 0.94rem;
`;
const TitleWrap = styled.div`
    display: flex; 
    flex-direction: column;
`;
const NickName = styled(SBold192)`
    margin-right: 0.125rem;
    color: var(--black, #000);
    text-align: justify;
`;
const NoticeType = styled.div`
    color: var(--black, #000);
    text-align: justify;

    /* S-regular-25 */
    font-family: Pretendard;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`
const PostTitle = styled.div`
    margin-left: 0.25rem;
    margin-right: 0.125rem;
    color: var(--black, #000);
    text-align: justify;

    // /* S-bold-25 */
    // font-family: Pretendard;
    // font-size: 1.5625rem;
    // font-style: normal;
    // font-weight: 700;
    // line-height: normal;
    
    /* S-bold-19.2(RE) */
    font-family: Pretendard;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;
const Date = styled(XSSemibold16)`
    color: var(--gray_bold, #4A4A4A);
`
const CommentWrap = styled(XSRegular16)`
    color: var(--gray_bold, #4A4A4A);

    margin-left: 3.5rem;
    margin-bottom: 0.5rem;
`


const SubscribeWrap = styled.button`
    display: flex;
    padding: 0.75rem 3.9375rem;
    align-items: center;
    gap: 0.9375rem;

    border : 4px solid black;

    text-align: justify;
    // /* XS-semibold-20 */
    // font-family: Pretendard;
    // font-size: 1.25rem;
    // font-style: normal;
    // font-weight: 600;
    // line-height: normal;

    /* XS-semibold-16(RE) */
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    cursor: pointer;

    background: ${props => props.isSubscribed ? 'white' : 'var(--black, #000)'};
    color: ${props => props.isSubscribed ? 'black' : 'var(--white, #FFF)'};

    &:hover {
        background: ${props => props.isSubscribed ? 'red' : 'white'};
        color: ${props => props.isSubscribed ? 'var(--white, #FFF)' : 'black'};
        border-color: ${props => props.isSubscribed ? 'red' : 'black'};

        transition: 0.5s;
    }
`

// Skeleton loading animation keyframes
const skeletonAnimation = keyframes`
    0% {
        background-color: rgba(0, 0, 0, 0.05);
        // transform: translateX(-150%);

    }
  
    50% {
        background-color: rgba(0, 0, 0, 0.15);
        // transform: translateX(-60%);

    }
  
  	100% {
    	background-color: rgba(255,255 ,255 , .7);
        // transform: translate(150%);

  	}
`;

// Skeleton item component for loading animation
const SkeletonItem = styled.div`
  	width: ${({ width }) => width || '100%'};
	height: ${({ height }) => height || '1rem'};
	border-radius: ${({ borderRadius }) => borderRadius || '4px'};
	background-color: var(--gray_bold); /* Or any desired color */
	animation-duration: ${({ duration }) => duration || '1s'};
	animation-fill-mode: ${({ fillMode }) => fillMode || 'forwards'};
	animation-iteration-count: infinite;
	animation-name: ${skeletonAnimation};
	animation-timing-function: linear;
	margin-bottom:${({ marginBottom })=>marginBottom||'10px'}
`;
