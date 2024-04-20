import React from 'react';
import Header from '../../components/common/HeaderLogoOnly';
import styled from 'styled-components';
import KakaoLogin from './KakaoLogin';
import Footer from '../../components/common/Footer';

const LoginPage = () => {
    return (
        <PageWrap>
            <Header/>
            
            <Wrap>
                <Text>#lifestyle #travel #foodie #entertainment #tech #sports #news</Text>
                <KakaoLogin/>
                <Footer/>
            </Wrap>

        </PageWrap>
    );
};

export default LoginPage;

const PageWrap = styled.div`
    height: 100vh;

    display: flex;
    flex-direction: column;
`;
const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    flex-grow: 1;
`;
const Text = styled.div`
    padding: 6.25rem 28.75rem;

    color: var(--gray_bold, #4A4A4A);
    font-family: Pretendard;
    font-size: 3.4375rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

&::after {
    content: " ...Onlog";
    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 3.4375rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
`;
