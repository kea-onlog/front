import styled from 'styled-components';
import { Kakao_Auth_url } from './OAuth';


const KakaoLogin = () => {

    const handleLogin = () => {
        // 여기서 jwt유무 혹은 jwt만료로 회원가입/로그인 분류하기!!
        

        // 카카오 로그인 페이지로 이동
        window.location.href = Kakao_Auth_url; // 현재 주소창의 주소값 불러오기
        console.log("Test")
   
    }

    // const navigate = useNavigate();

    // const onKakaoClick = useCallback(() => {
    // navigate("/login");
    // }, [navigate]);

    return(
        <Wrap>
            <ButtonWrap onClick={(handleLogin)}>
                <LogoText>
                    <Icon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="30" viewBox="0 0 33 30" fill="none">
                            <path d="M32.2137 12.1429C32.2137 18.8492 25.1782 24.2857 16.4994 24.2857C15.5237 24.2857 14.5688 24.217 13.6423 24.0855C11.566 23.7908 9.6325 23.1807 7.92801 22.322C3.62771 20.1553 0.785156 16.4056 0.785156 12.1429C0.785156 5.43654 7.82068 0 16.4994 0C25.1782 0 32.2137 5.43654 32.2137 12.1429Z" fill="black"/>
                            <path d="M7.92801 22.322L6.49944 30L13.6423 24.0855C11.566 23.7908 9.6325 23.1807 7.92801 22.322Z" fill="black"/>
                        </svg>
                    </Icon>
                    <Text>카카오 로그인</Text>
                </LogoText>
            </ButtonWrap>
        </Wrap>
    );
};

export default KakaoLogin;

const Wrap = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
`;
const ButtonWrap = styled.button`
    cursor: pointer;

    display: flex;
    width: 29.1875rem;
    height: 5.625rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    border-radius: 0.75rem;
    background: #FEE500;
    border: none;
`
const LogoText = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 0.9375rem;
`
const Icon = styled.div`
    width: 1.96431rem;
    height: 1.875rem;
    fill: var(--general-theme-black, #000);
`
const Text = styled.div`
    color: rgba(0, 0, 0, 0.85);
    font-family: Pretendard;
    font-size: 1.625rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`