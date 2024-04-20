import styled from "styled-components";
import { SBold17, XSRegular16 } from "../../components/style/Styled";
// import Parser from 'html-react-parser';
import { useDispatch } from 'react-redux';
import { colorAction } from '../../store/actions/color';
import { useEffect , useState} from "react";
import { navData } from "../../assets/datas/categoryData";
import { Post_follow, Delete_Follow } from "../../apis/API_Subs";


function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;  
    }
  }

const PostThumb = ({post, isSubs}) => {
    const userId = window.localStorage.getItem("userId");
    const [isAdmin, setIsAdmin] = useState(false);
    // 현재 유저와 글 작성자가 같은지 판단 (구독중 버튼 띄우기 위함)
    useEffect(() => {
        if (userId === post.writer.blogId) {
        setIsAdmin(true);
        } else {
        setIsAdmin(false);
        }
    }, [userId, post.writer.blogId]);

    const defaultImageUrl = "https://i.namu.wiki/i/awkzTuu2p6WdaGIUbeHWGj0yzxUOd_wniEADxzMH8qvhWH4TDkpkkiUAJpefC-8J79giMVyjN5y1uRYQVoQm2g.webp";  // 이미지 url이 유효한 값이 아닌 string일 때 기본 이미지 URL 설정
    const thumbImageUrl = isValidUrl(post.thumbnailLink) ? post.thumbnailLink : defaultImageUrl;


    const dispatch = useDispatch();
    const [topic, setTopic] = useState({
        name:"",
        color:"",
    });

    useEffect(() => {
        if (post && post.topic) {
            setTopic({
                name: navData[post.topic.id].kName,
                color: navData[post.topic.id].color,
            });

            dispatch(
                colorAction({
                    category: navData[post.topic.id].name,  
                    color: navData[post.topic.id].color,
                })
            );
        }
    }, [post, dispatch]);

    // 구독하기 버튼
    const [isSubscribed, setSubscribed] = useState(isSubs); // 구독 상태를 저장하는 state
    const [isHovered, setHovered] = useState(false); // Hover 상태를 저장하는 state
    const handleSubscribe = async (e) => {
        // 구독중인 상태에서 버튼 누른거라면, 구독취소 요청
        if(isSubscribed){
            const response = await Delete_Follow(post.writer.blogId);
            if (response.success) {
                console.log("구독 취소 완료");
                setSubscribed(false);
            } else {
                console.error("구독취소 실패", response.message);
            }
        }
        // 구독 아닌 상태에서 버튼 누른거라면, 구독요청
        else{
            const response = await Post_follow(post.writer.blogId);

            if (response.success) {
                console.log("구독 완료!!!! 성공!");
                setSubscribed(true);
            } else {
                console.error("구독하는거 실패", response.message);
            }
        }
    }

    return(
        <>
            <Menu>
                <ProfileImg $profileImg={post.writer && post.writer.blogProfileImg}></ProfileImg>
                <TitleWrap>
                    <BlogName>{post.writer && post.writer.blogName}</BlogName>
                    <NickName>@{post.writer && post.writer.blogNickname}</NickName>
                </TitleWrap>
                {!isAdmin&&(
                    <SubscribeWrap 
                    onClick={handleSubscribe} 
                    $isSubscribed={isSubscribed}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    >
                    {isHovered ? (isSubscribed ? "구독 취소" : "구독하기") : (isSubscribed ? "구독 중" : "구독하기")}
                    </SubscribeWrap>
                )}
            </Menu>
            <Wrap>
                <ThumbImgDiv $thumbImg={thumbImageUrl} color={topic.color}>  </ThumbImgDiv>
                <Summary dangerouslySetInnerHTML={{__html: post.summary}}/>
            </Wrap>
        </>
    );
};

export default PostThumb;

const Menu = styled.div`
    // padding: 1.25rem 6.25rem;
    padding: 1rem 0rem 0rem 0rem;
    display: flex;
    align-items: center;
`;
const ProfileImg = styled.div`
    width: 3rem;
    height: 3rem;
    border-radius: 2.5rem;
    background: url(${props => props.$profileImg}) #FF7575 50% / cover no-repeat;
    margin-right: 0.94rem;
`;
const TitleWrap = styled.div`
    text-decoration: none;
    color: var(--black);
`;
const BlogName = styled(SBold17)`
    text-align: justify;

    color: var(--black, #000);
`;
const NickName = styled(XSRegular16)`
    color: var(--gray_bold, #4A4A4A);
    text-align: justify;
`;

const Wrap = styled.div`
    display: flex;
    // padding: 1.875rem 6.25rem;
    padding: 1rem 0rem;
    justify-content: flex-start;
    align-items: center;
    align-content: flex-start;
    gap: 2rem;
    align-self: stretch;
    flex-wrap: wrap;
`
const ThumbImgDiv = styled.div`
    width: 20rem;
    height: 20rem;
    background: url(${props => props.$thumbImg}), var(${props=>props.color});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
`


const Summary = styled(SBold17)`
    width: 30rem;
    color: var(--gray_bold, #4A4A4A);
    text-align: justify;

    line-height: 2.3rem;
`
const SubscribeWrap = styled.button`
    display: flex;
    margin-left: 1rem;
    padding: 0.5rem 0.5rem;
    align-items: center;
    gap: 0.9375rem;

    border : 2px solid black;

    text-align: justify;
    
    /* XS-bold-13(RE) */
    font-family: Pretendard;
    font-size: 0.7rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    cursor: pointer;

    background: ${props => props.$isSubscribed ? 'white' : 'var(--black, #000)'};
    color: ${props => props.$isSubscribed ? 'black' : 'var(--white, #FFF)'};

    &:hover {
        background: ${props => props.$isSubscribed ? 'red' : 'white'};
        color: ${props => props.$isSubscribed ? 'var(--white, #FFF)' : 'black'};
        border-color: ${props => props.$isSubscribed ? 'red' : 'black'};

        transition: 0.5s;
    }
`