import Header from '../../components/common/HeaderLogoOnly';
import styled from 'styled-components';
import { SRegular20, SBold192 } from '../../components/style/Styled';
import Swal from 'sweetalert2';
import TextareaAutosize from 'react-textarea-autosize'; // npm install react-textarea-autosize
import "./Login.css";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Get_Profile } from '../../apis/API_MyPage';

const SignUp = () => {

    const {user} = useSelector((state) => state.profile); 
    const navigate = useNavigate();
    // console.log("user.blogId : ",user.blogId);
    // console.log(user.email)
    // console.log(user.email, user.userId);
    // console.log(user ? user.email : 'User not defined'); 
    const email = window.localStorage.getItem("email");
    const profileImg = window.localStorage.getItem("profileImg");
    const [userData, setUserData] = useState({});

    useEffect(() => {
        console.log("user.blogId : ", user.blogId);
        if(user && user.blogId) {
            setUserData({
                ...userData, 
                blogId: user.blogId
            })
    
            Get_Profile(user.blogId)
            .then((data) => {
                console.log("get profile: " ,data.data);
    
            })
        }

    }, [user,userData]);

    const handleChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value});
        console.log('userData : ',userData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const nickname = e.target.elements.nickname.value;
        // const blogname = e.target.elements.blogname.value;
        // const info = e.target.elements.info.value;
        // const profileImg = window.localStorage.getItem("profileImg");

        if(!userData.nickName || !userData.blogName || !userData.info) {
            Swal.fire({
                // icon: "warning",
                title: "빈칸을 모두 채워주세요!"}
            )            
            return;
        } else {

            try {
                const url = '/blog';
                const res = await axios({
                    method:"put",
                    url: url,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    data: {
                        // blogId: user.userId,
                        // blogName: blogname,
                        // blogNickname: nickname,
                        // blogIntro: info,
                        // blogProfileImg: profileImg,
                        blogId: user.userId,
                        blogName: userData.blogName,
                        blogNickname: userData.nickName,
                        blogIntro: userData.info,
                        blogProfileImg: profileImg,
                    }
                });

                console.log("signup")
                console.log(user.userId);
                console.log(res.data);
                if(res.data.success) {
                    navigate('/main');
                } else {
                    console.log("회원가입 서버 에러");
                }

            } catch(error) {
                console.log(error);
            }
    }

    };

    if (!user) return null; // user값 받아오기 전에는 렌더링x

    return(
        <div>
            <Header/>
            {/* <LoginInner>
                <form onSubmit={handleSubmit}>
                    <Parent>
                            <FieldName>이메일</FieldName>
                                <div className="emailField">
                                    <div>{user.email}</div>
                                </div>
                            <FieldName>닉네임</FieldName>
                                <div className="field">
                                    <input type='text' name='nickname'/>
                                </div>
                            <FieldName>블로그명</FieldName>
                                <div className="field">
                                    <input type='text' name='blogname'/>
                                </div>
                            <FieldName>블로그 소개</FieldName>
                                <div className="field">
                                    <input type='text' name='info'/>
                                </div>
                    </Parent>
                
                    <StyledButton type='submit'> Sign In </StyledButton>
                </form>
            </LoginInner> */}

            <Wrap>
                <ProfileImageWrap>
                    <Image $imgUrl={profileImg}/>
                </ProfileImageWrap>
                
                <FormWrap onSubmit={handleSubmit}>
                    <Wrap2>
                        <Title> 이메일 </Title>
                        <Email>{email}</Email>
                    </Wrap2>
                    <Wrap2>
                        <Title>닉네임</Title>
                        <NicknameWrap>
                            <NicknameBasic>@</NicknameBasic>
                            {/* <NicknameInputEdit name='nickName' type='text' value={user.nickName} onChange={handleChange} /> */}
                            <NicknameInputEdit name='nickName' type='text' onChange={handleChange}/>
                        </NicknameWrap>
                    </Wrap2>
                    <Wrap2>
                        <Title>블로그명</Title>
                        {/* <InputEdit name='blogName' type='text' value={user.blogName} onChange={handleChange} /> */}
                        <InputEdit name='blogName' type='text' onChange={handleChange}/>
                    </Wrap2>
                    <Wrap2>
                        <Title>블로그 소개</Title>
                        <SRegular20 style={{color:"var(--gray_bold, #4A4A4A)"}}>
                            {/* <InfoEdit name='info' type='text' value={user.info} style={{ overflow: 'hidden' }} onChange={handleChange} /> */}
                            <InfoEdit name='info' type='text' style={{ overflow: 'hidden' }} onChange={handleChange}/>
                        </SRegular20>
                    </Wrap2>
                    <Wrap2 style={{alignItems:'flex-end'}}>
                        <StyledButton type='submit'> Sign In </StyledButton>
                    </Wrap2>
                </FormWrap>
            </Wrap>
        </div>
    );
};

export default SignUp;

// const Wrap = styled.div`
//     padding: 7.125rem 6.25rem 0rem 6.25rem;
//     display: grid;

//     grid-template-columns: repeat(3, 29.0625rem);
//     /* grid-template-rows: repeat(3, 45.1875rem); */
//     /* grid-template-columns: 1fr 1fr 1fr; */

//     justify-content: center;
//     gap: 0.62rem;
// `;
export const LoginInner = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 36.25rem 0rem;
`;

export const Parent = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: var(--gap-4xs);
`;
// const FieldName = styled(SBold25)`
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//     padding-top: 30px;
//     gap: 0.5625rem;
//     align-self: stretch;
//     color: var(--gray_bold, #4A4A4A);

// `
const StyledButton = styled.button`
    width: 15.375rem;
    height: 3.375rem;
    margin-top: 20px;
    position: relative;
    float: right;
    color: var(--white, #FFF);
    font-size: 20px;
    background-color: black;
    font-weight : 700;
    font-family: Pretendard;
    font-size: 1.5625rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    // transition: 0.3s all;
    border : none;

    &:active,
    &:hover,
    &:focus {
     background: white;
     color: black;
     border: 4px solid var(--black, #000);
    }

    &:disabled {
     cursor: default;
     opacity: 0.5;
    background: var(--button-bg-color, #025ce2);
    }   
`;
const Wrap = styled.div`
    display: flex;
    padding: 3.75rem 8rem;
    justify-content: space-between;
    align-items: flex-start;

`
const ProfileImageWrap = styled.div`
    display: flex;
    padding: 0rem 2.5rem;
    align-items: center;
    gap: 1.25rem;
`
const Image = styled.div`
    width: 28.125rem;
    height: 28.125rem;
    border-radius: 25rem;
    background: url(${props => props.$imgUrl}) lightgray 50% / cover no-repeat;
    margin-right: 0.94rem;
`

const FormWrap = styled.form`
    display: flex;
    width: 47.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.0625rem;
`
const Wrap2 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5625rem;
    align-self: stretch;
`
const Title = styled(SBold192)`
    width: 8.4375rem;
    height: 1.75rem;
    color: var(--gray_bold, #4A4A4A);
`
const Email = styled(SRegular20)`
    display: flex;
    padding: 0.6875rem 1.4375rem;
    align-items: center;
    gap: 0.625rem;
    align-self: stretch;
    border-bottom: 1.5px solid var(--gray_bold, #4A4A4A);
    color: var(--gray_light, #939393);
`

const NicknameWrap = styled(SRegular20)`
    display: flex;
    padding: 0.6875rem 1.4375rem;
    align-items: center;
    gap: 0.625rem;
    align-self: stretch;
    border-bottom: 1.5px solid var(--gray_bold, #4A4A4A);
`
const NicknameBasic = styled(SRegular20)`
    color: var(--gray_light, #939393);
`
const NicknameInputEdit = styled(SRegular20).attrs({as:'input'})`
    border:none;
    color: var(--gray_bold, #4A4A4A);
    width: 40rem;
`
const InputEdit = styled(SRegular20).attrs({as:'input'})`
width: 44.625rem;
    display: flex;
    padding: 0.6875rem 1.4375rem;
    align-items: center;
    gap: 0.625rem;
    align-self: stretch;
    border: none;
    border-bottom: 1.5px solid var(--gray_bold, #4A4A4A);

    color: var(--gray_bold, #4A4A4A);


    &:hover{
        /* background-color: #e5e5e5; */
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
    }
`
const InfoEdit = styled(TextareaAutosize)`
    width: 44.625rem;
    display: flex;
    padding: 0.6875rem 1.4375rem;
    align-items: center;
    gap: 0.625rem;
    align-self: stretch;
    border: none;
    border-bottom: 1.5px solid var(--gray_bold, #4A4A4A);

    resize: none;

    color: var(--gray_bold, #4A4A4A);
    /* S-regular_20(RE) */
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2.3rem; /* 184% */
    letter-spacing: 0.0125rem;

    &:hover{
        /* background-color: #e5e5e5; */
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
    }
`

// const SubmitButton = styled(SBold192).attrs({as:'button'})`
//     border:4px solid black;
//     display: flex;
//     padding: 0.75rem 4.0625rem;
//     align-items: center;
//     gap: 0.9375rem;
//     background-color: black;
//     color: var(--white, #FFF);
//     text-align: justify;

//     cursor: pointer;

//     &:hover{
//         background-color: white;
//         color: black;
//     }
//     &:active{
//         transform: scale(0.95);
//     }
// `