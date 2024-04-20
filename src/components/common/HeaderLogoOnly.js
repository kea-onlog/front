import React from 'react';
import styled from 'styled-components';
import {ReactComponent as Logo} from '../../assets/images/Logo2.svg';
import { useNavigate } from 'react-router-dom';

const HeaderLogoOnly = () => {
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
        </Wrap>
    );
};

export default HeaderLogoOnly;

const Wrap = styled.div`
    background: var(--white);
    padding: 1.88rem 6.25rem;    
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