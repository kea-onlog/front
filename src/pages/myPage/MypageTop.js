import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { LBold32, SBold192, SBold25, SRegular208, SRegular30 } from '../../components/style/Styled';
import { Get_Profile } from "../../apis/API_MyPage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileAction } from "../../store/actions/profile";
import SubscribeCheck from "./SubscribeCheck";

const MypageTop = () => {

    // url에서 userId 가져오기 -> 이걸 api에 params로 넣어주기!
    let params = useParams().userId;
    if (params === undefined) {
        params = window.localStorage.getItem("userId");
    }

    // console.log(params);
    // 수정 및 생성 권한 있는지 확인
    const userAuth = useSelector(state => state.profile.userAuth);
    
    useEffect(() => {
        // userAuth 값이 변경되었을 때 실행되는 로직
        console.log("userAuth 변경:", userAuth);
    }, [userAuth]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({}); 

    useEffect(() => {
        dispatch(
            profileAction({
                userId: params
            })
        )
    
        Get_Profile(params)
            .then((data) => {
                if (data.success === false) {
                    throw new Error(data.message); // 에러 발생
                }

                setProfile({       
                    blogId: params,
                    blogName: data.data.blogName,
                    blogNickname: data.data.blogNickname,
                    blogProfileImg: data.data.blogProfileImg,
                    likeCount: data.data.likeCount,
                    postCount: data.data.postCount,
                    subscriberCount: data.data.subscriberCount,
                    blogIntro: data.data.blogIntro,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, [params, dispatch]);
    
    

    const handleClick = (e) => {
        e.preventDefault();
        
        switch(e.currentTarget.name) {
            case "post" :
                navigate('/mypage/postwrite');
                break;
            case "edit" :
                navigate('/mypage/edit');
                break;
            default:
                break;
        }
    };

    return (
        <PageWrap>
            <Wrap1>
                <Left>
                    <Menu>
                        <ProfileImg $proflieImg={profile.blogProfileImg}/>
                        <TitleWrap>
                            <BlogTitle>{profile.blogName}</BlogTitle>
                            <Name>@{profile.blogNickname}</Name>
                        </TitleWrap>
                    </Menu>
                </Left>

                <Right>
                    <Box>
                        <Title> 작성한 글 </Title>
                        <Num>{profile.postCount}</Num>
                    </Box>
                    <Box>
                        <Title> 좋아요 수 </Title>
                        <Num>{profile.likeCount}</Num>
                    </Box>
                    <Box style={{borderRight:"none"}}>
                        <Title> 구독자 수 </Title>
                        <Num>{profile.subscriberCount}</Num>
                    </Box>
                </Right>
            </Wrap1>
            <Wrap2>
                <ProfileInfo>
                    {profile.blogIntro}
                </ProfileInfo>
            </Wrap2>
            
            {userAuth ? (
                <Wrap2>
                    <Button name = 'post' onClick={handleClick}>글 작성</Button>
                    <Button name = 'edit' onClick={handleClick}>프로필 수정</Button>
                </Wrap2>
            ) : (
                <Wrap2>
                    <SubscribeCheck params={params}/>
                </Wrap2>
            )}

        </PageWrap>
    );
};

export default MypageTop;

const PageWrap = styled.div`
    padding: 3.75rem 0rem 1.875rem 0rem;
`
const Wrap1 = styled.div`
    // display: flex;
    // padding-bottom: 1.88rem;
    // justify-content: center;
    // align-items: center;
    // align-content: flex-start;
    // align-self: stretch;
    // flex-wrap: wrap;

    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    row-gap: 3.75rem;
    align-self: stretch;
    flex-wrap: wrap;
`

const Left = styled.div`
    display: flex;
    align-items: center;
    gap: 1.25rem;
    width: 35.5rem;
    padding-bottom: 2rem;
`
const Menu = styled(SBold25)`
    display: flex;
    align-items: center;
`;
// const Profile = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 1.875rem;
//     display: flex;
//     padding: 2rem 0rem 0rem 18.8125rem;
//     gap: 0.625rem;
//     align-self: stretch;
//     background: url(ProfileImg), lightgray 50% / cover no-repeat;
// `
const ProfileImg = styled.div`
    width: 12.6875rem;
    height: 12.625rem;
    border-radius: 6.875rem;
    background: ${props => `url(${props.$proflieImg}) lightgray 50% / cover no-repeat`};
    margin-right: 2.81rem;
`;
const TitleWrap = styled.div`
    display: flex; 
    flex-direction: column;
`;
const BlogTitle = styled(LBold32)`
    color: var(--black, #000);
`;
const Name = styled(SRegular30)`
    color: var(--gray_bold, #4A4A4A);
    text-align: justify;
`;
const Right = styled.div`
    display: flex;
    padding-left: 0px;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
`
const Box = styled.div`
    display: flex;
    padding: 0rem 3.125rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-right: 1px solid var(--gray_light, #939393);
`
const Title = styled(SRegular208)`
    color: var(--gray_bold, #4A4A4A);
    text-align: justify;

`
const Num = styled(LBold32)`
    color: var(--black, #000);
    text-align: justify;


`

const Wrap2 = styled.div`
    display: flex;
    // padding: 1.25rem 25rem 3.75rem 25rem;
    padding-bottom: 1.25rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    align-self: stretch;
`
const ProfileInfo = styled(SRegular30)`
    color: var(--gray_bold, #4A4A4A);

`
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
`