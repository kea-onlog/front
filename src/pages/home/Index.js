import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import styled, { css } from 'styled-components';
import {ReactComponent as Home} from '../../assets/images/Icons/Home.svg'
import { LSemibold32, XLSemibold56 } from '../../components/style/Styled';
import { Link, useLocation } from 'react-router-dom';
import { AniShow, AniFrameIn } from '../../components/style/AniStyled';
import Card from './Card';
import SearchBox from '../search/SearchBox';
import Footer from '../../components/common/Footer';
import { navData } from '../../assets/datas/categoryData';
import BackImage from '../../components/common/BackImage';
import { useDispatch } from 'react-redux';
import { colorAction } from '../../store/actions/color';
import { filterListAction } from '../../store/actions/card';

const HomePage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [category, setCategory] = useState({
        name: null,
        kName: null,
        color: null,
    });


useEffect(() => {
    let path = location.pathname.replace(/\/main\/|\/main/g, '');
    const newCategory = navData.find(item => item.name === path);
    console.log("확인확인", newCategory)
    
    if (newCategory) {
        setCategory({
            name: newCategory.name,
            hoverName: newCategory.kName,
            color: newCategory.color
        });

        dispatch(
            colorAction({
                category: newCategory.name,
                color: newCategory.color,
            })
        );
        dispatch(
            filterListAction({
                topic: newCategory.name
            })
        )
    }
}, [location.pathname, dispatch]);

    const isCurrent = to => to === location.pathname;

    return (
        <>
            <BackImage/>

            <StickyWrap>
                <Header/>
                <Wrap>
                    <TopWrap>
                        {(category.name==="") ? (
                            <Title>Onlog <p>&nbsp; 는 지금...</p></Title>
                        ) : (
                            <Title2 color={category.color}>#{category.name}</Title2>
                        )}
                        <SearchBox/>
                    </TopWrap>

                    <Nav>
                        <LinkWrap>
                            {navData.map((item) => {
                                const to = item.id === 0 ? '/main' : `/main/${item.name}`;
                                return (
                                    <NavL to={to} $active={isCurrent(to)} hovername={item.kName} key={item.id} color={item.color}>
                                        <p>{item.id === 0 ? <Home/> : `#${item.name}`}</p>
                                    </NavL>
                                )
                            })} 
                        </LinkWrap>
                    </Nav>
                </Wrap>
            </StickyWrap> 

            <PageWrap>

                {/* <Card/> */}
                {/* category.name이 설정되는 시점과 filterListAction이 dispatch되는 시점이 동일하기 때문에 => Card컴포넌트에서 filterList가 다 업데이트되기도 전에 HomePage컴포넌트의 dispatch를 변경으로 감지하여, 초기값이 들어가버리는 상황 방지*/}
                {category.name!==null && <Card/>}
                {/* <Card/>  */}
                {/* <ScrollTop/> */}
                <Footer/>
                
            </PageWrap>
        </>
    );
};

export default HomePage;

const StickyWrap = styled.div`
    background-color: white;
    position: sticky;
    top: 0;
`
const PageWrap = styled.div`
    margin: 0rem 10rem;
/* 
    @media ${({ theme }) => theme.windowSize.test} {
        background-color: pink;
    } */
`;
const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0rem 7rem;
    gap: 1.25rem;
`;
const TopWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;


const Nav = styled.div`
    width: 100%;
`;
const Title = styled.div`
    // 애니
    animation: ${AniShow} 1s forwards;

    padding: 1.03125rem 0rem;
    display: flex;
    align-items: center;

    color: var(--black, #000);
    font-family: Pretendard;
    font-size: 3.3125rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;    
    p {
        color: var(--black, #000);
        font-family: Pretendard;
        font-size: 3rem;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
    }
`;
const Title2 = styled(XLSemibold56)`
    // 애니
    animation: ${AniShow} 1s forwards;

    padding: 1.03125rem 0rem;
    display: flex;
    align-items: center;

    color: var(${props => props.color});
`;
const LinkWrap = styled(LSemibold32)`
    display: flex;
    gap: 0rem 2.44rem;
    margin-bottom: 1rem;
`;
const NavL = styled(Link)`
    text-decoration: none;
    color: var(--gray_bold, #4A4A4A);

    // 안보이게
    display : ${(props) => (props.$active ? 'none' : '')};

    // 애니
    animation: ${(props) => (!props.to.includes(props.category) ? (
        css`
         ${AniFrameIn} .5s forwards
        `
    ) : "")};


    &:hover p {
        display: none;
    }
    &:hover:before {
        content: '${(props) => (props.hovername)}';
        background-color: var(${props => props.color});
        color: var(--white);
        padding: 0rem 2rem;
        white-space: nowrap; /* 추가된 부분 */
    }
`;