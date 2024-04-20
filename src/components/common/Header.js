import React, {useEffect} from 'react';
import styled from 'styled-components';
import {ReactComponent as Logo2} from '../../assets/images/Logo2.svg';
import { SBold192, SBold25, XSBold13, XSRegular16 } from '../style/Styled';
import { Link, useNavigate } from 'react-router-dom';
import { Get_Profile } from '../../apis/API_MyPage';
import { useDispatch, useSelector } from 'react-redux';
import { profileAction } from '../../store/actions/profile';

const Header = () => {
    const accessToken = window.localStorage.getItem("accessToken");
    //
    const dispatch = useDispatch();
    const user = useSelector((state) => state.profile.user);
    //

    // const [user, setUser] = useState({
    //     blogName: "",
    //     blogNickname:"",
    //     blogProfileImg: "",
    // }); 

    useEffect(() => {
        const userId = window.localStorage.getItem("userId");
        Get_Profile(userId)
        .then((data) => {
            console.log("header:",data);
            // setUser({
            //     ...user,
            //     blogName: data.data.blogName,
            //     blogNickname: data.data.blogNickname,
            //     blogProfileImg: data.data.blogProfileImg,
            // })
            dispatch(
                profileAction({
                    blogName: data.data.blogName,
                    nickName: data.data.blogNickname,
                    profileImg: data.data.blogProfileImg,
                    info: data.data.info,
                })
            )

        })
        .catch((error) => {
            console.log(error);
        });
    },[dispatch]);

    const navigate = useNavigate();
    const handleClick = (e) =>   {
        console.log(e)
            switch(e.currentTarget.name) {
                case "logo" :
                    navigate('/');
                    break;
                case "signin" :
                    navigate('/login');
                    break;
                case "myPage" :
                    navigate(`/mypage`);
                    break;
                default:
                    break;
            }
    }
    // useEffect(() => {
    //     console.log(user)
    // },[user])
    return (
        <Wrap>
            <LogoBtn name="logo" onClick={handleClick}>
                <Logo2 />
            </LogoBtn>
            {accessToken ? (
                <MenuWrap>
                    <Menu>
                        <MenuL to={'/subscribed'}>구독</MenuL>
                        <Alarm>10</Alarm>
                    </Menu>
                    <Menu>
                        <MenuL to={'/notification'}>알림</MenuL>
                        <Alarm>21</Alarm>
                    </Menu>


                    {/* <UserProfile/> */}
                    <MyPageBtn name='myPage' onClick={handleClick}>
                        <ProfileImg $blogProfileImg={user.profileImg}></ProfileImg>
                        <TitleWrap to={'/mypage'}>
                            <Title>{user.blogName}</Title>
                            <Name>@{user.nickName}</Name>
                        </TitleWrap>
                    </MyPageBtn>
                </MenuWrap>
            ):(
                <SignInBtn name="signin" onClick={handleClick}>Sign in</SignInBtn>
            )}
        </Wrap>
    );
};

export default Header;

const Wrap = styled.div`
    background: var(--white);
    padding: 1.2rem 6.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {

    }
`;
const LogoBtn = styled.button`
  background-color: transparent;
  border:none;
  outline:none;
  cursor:pointer; // 마우스 커서를 손 모양으로 변경
  svg {
      pointer-events:auto; // SVG 내부의 그래픽 요소에만 마우스 이벤트 적용
   }
`;
const MenuWrap = styled.div`
    display: flex;
    gap: 2.5rem;
    align-items: center;
`;
const Menu = styled(SBold192)`
    display: flex;
    align-items: center;
`;
const MenuL = styled(Link)`
    text-decoration: none;
    color: var(--black);
`;
const ProfileImg = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 2.5rem;
    /* background: url(${props => props.$blogProfileImg}) lightgray 50% / cover no-repeat; */
    background: ${props => `url(${props.$blogProfileImg}) lightgray 50% / cover no-repeat`};
    margin-right: 0.94rem;
`;
const Alarm = styled(XSBold13)`
    color: #F00;
    align-self: flex-start;
`;
const TitleWrap = styled(Link)`
    text-decoration: none;
    color: var(--black);
`;
const Title = styled.div`
    text-align: justify;
`;
const Name = styled(XSRegular16)`
    color: var(—gray_bold, #4A4A4A);
    text-align: justify;
`;
const SignInBtn = styled(SBold25).attrs({ as: 'button' })`
    padding: 0.55rem 2.1875rem;
    font-size: 1rem;
    background-color: var(--black);
    color: var(--white);

    border: 4px solid black;

    cursor: pointer;

    &:hover{
        background-color: white;
        color: black;
        transition: 0.5s;
    }

    &:active{
        transform: scale(0.95);
    }
`;
const MyPageBtn = styled(Menu).attrs({ as: 'button' })`
    border: none;
    background-color: transparent;
    cursor: pointer;
`;