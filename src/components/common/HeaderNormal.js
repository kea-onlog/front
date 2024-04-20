import React from 'react';
import styled from 'styled-components';
import {ReactComponent as Logo} from '../../assets/images/Logo.svg';
import { useNavigate } from 'react-router-dom';
import { SBold25 } from '../style/Styled';

const HeaderNormal = () => {
    const navigate = useNavigate();
    const handleClick = (e) =>   {
            switch(e.currentTarget.name) {
                case "logo" :
                    navigate('/main');
                    break;
                case "signin" :
                    navigate('/login');
                    break;
                default:
            }
    }

    return (
        <Wrap>
            <LogoBtn name="logo" onClick={handleClick}>
                <Logo />
            </LogoBtn>
            <SignInBtn name="signin" onClick={handleClick}>Sign in</SignInBtn>
        </Wrap>
    );
};

export default HeaderNormal;

const Wrap = styled.div`
    background: var(--white);
    padding: 0.5rem 6.25rem;    
    display: flex;
    align-items: center;
    justify-content: space-between;
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