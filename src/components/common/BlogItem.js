import styled, {keyframes} from "styled-components";
import { XSRegular16 } from '../style/Styled';
import { useState, useEffect } from "react";
// import Swal from "sweetalert2";
import { Get_SubProfile, Post_follow, Delete_Follow } from "../../apis/API_Subs";
import { useNavigate } from "react-router-dom";

const BlogItem = ({blogId, isSubs}) => {

    const [isSubscribed, setSubscribed] = useState(isSubs); // 구독 상태를 저장하는 state
    const [isHovered, setHovered] = useState(false); // Hover 상태를 저장하는 state
    const [isLoading, setLoading] = useState(true); // 데이터 로딩 상태를 저장하는 state (skeleton)

    setTimeout(() => {
        setLoading(false);
    }, 2000);

    const [profile, setProfile] = useState({}); 

    useEffect(() => {
        Get_SubProfile(blogId) // 구독중인 블로그의 상세 정보 get
        .then((data) => {
            setProfile({
                blogName: data.data.blogName,
                blogNickname: data.data.blogNickname,
                blogProfileImg: data.data.blogProfileImg,
                blogIntro: data.data.blogIntro,
            })
        })
        .catch((error) => {
            console.log(error);
        });
    },[blogId]);
    
    const handleSubscribe = async (e) => {
        // 구독중인 상태에서 버튼 누른거라면, 구독취소 요청
        if(isSubscribed){
            const response = await Delete_Follow(blogId);
            if (response.success) {
                console.log("구독 취소 완료");
                setSubscribed(false);
            } else {
                console.error("구독취소 실패", response.message);
            }
        }
        // 구독 아닌 상태에서 버튼 누른거라면, 구독요청
        else{
            const response = await Post_follow(blogId);

            if (response.success) {
                console.log("구독 완료!!!! 성공!");
                setSubscribed(true);
            } else {
                console.error("구독하는거 실패", response.message);
            }
        }

        // Swal.fire({
        //     title: isSubscribed ? "구독 취소" : "구독 완료",
        //     html: isSubscribed ? "구독이 취소되었습니다!" : "구독이 완료되었습니다!",
        //     icon: 'success'
        // });
    }

    const navigate = useNavigate();
    const handleProfileBtn = (e) => {
        console.log('button 클릭');
        navigate(`/mypage/${blogId}`);
    }
    return(
        <Wrap>
            {isLoading ? (
                // Loading중이면 skeleton 효과
                <> 
                    <LeftWrap>
                        <Menu>
                            <ProfileImg style={{background:"none"}}>
                                <SkeletonItem width="3.2rem" height="3.2rem" $borderRadius="2.5rem"/>
                            </ProfileImg>
                            <TitleWrap>
                                <Title><SkeletonItem width="12rem" height="2rem" $borderRadius="2.5rem"/></Title>
                                <Name><SkeletonItem width="5.5rem" height="1rem" $borderRadius="2.5rem"/></Name>
                            </TitleWrap>
                        </Menu>
                        <BlogInfo><SkeletonItem width="15rem" height="1.5rem" $borderRadius="2.5rem"/> </BlogInfo>
                    </LeftWrap>
                    <SkeletonItem width="13rem" height="4rem"/>
                </>
            ) : (
                // loading중 아니라면 제대로 보여주기
                <>
                    <LeftWrap>
                        <Menu onClick={handleProfileBtn}>
                            <ProfileImg $imgUrl={profile.blogProfileImg}/>
                            <TitleWrap>
                                <Title>{profile.blogName}</Title>
                                <Name>@{profile.blogNickname}</Name>
                            </TitleWrap>
                        </Menu>

                        <BlogInfo> {profile.blogIntro}</BlogInfo>
                    </LeftWrap>
                    <SubscribeWrap 
                        onClick={handleSubscribe} 
                        $isSubscribed={isSubscribed}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                    {isHovered ? (isSubscribed ? "구독 취소" : "구독하기") : (isSubscribed ? "구독 중" : "구독하기")}
                    </SubscribeWrap>
                </>
            )}
        </Wrap>
    );
};

export default BlogItem;

const Wrap = styled.div`
    display: flex;
    padding: 1.25rem 0rem;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;

    border-bottom: 1px solid var(--gray_light, #939393);
`

const LeftWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.625rem;
    // flex: 1;

`
const Menu = styled.button`
    /* S-bold-17(RE) */
    font-family: Pretendard;
    font-size: 1.0625rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
`;
const ProfileImg = styled.div`
    width: 3.375rem;
    height: 3.375rem;
    border-radius: 2.5rem;
    background: url(${props => props.$imgUrl}) lightgray 50% / cover no-repeat;
    margin-right: 0.94rem;
`;
const TitleWrap = styled.div`
    display: flex; 
    flex-direction: column;
`;
const Title = styled.div`
    text-align: justify;
`;
const Name = styled(XSRegular16)`
    color: var(--gray_bold, #4A4A4A);
    text-align: justify;
`;
const BlogInfo = styled(XSRegular16)`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;

    overflow: hidden;
    color: var(--gray_bold, #4A4A4A);
    text-overflow: ellipsis;

    padding-Left: 4rem;
`
const SubscribeWrap = styled.button`
    display: flex;
    padding: 0.75rem 3.9375rem;
    align-items: center;
    gap: 0.9375rem;

    border : 4px solid black;

    text-align: justify;
    
    /* XS-semibold-16(RE) */
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    cursor: pointer;

    background: ${props => props.$isSubscribed ? 'white' : 'var(--black, #000)'};
    color: ${props => props.$isSubscribed ? 'black' : 'var(--white, #FFF)'};

    &:hover {
        background: ${props => props.$isSubscribed ? 'black' : 'white'};
        color: ${props => props.$isSubscribed ? 'var(--white, #FFF)' : 'black'};
        border-color: ${props => props.$isSubscribed ? 'black' : 'black'};

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