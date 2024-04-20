import React, { useEffect } from 'react';
import Header from '../../components/common/Header';
import MypageTop from './MypageTop.js';
import MypagePost from './MyPagePost';
import Footer from '../../components/common/Footer';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userAuthAction } from '../../store/actions/profile';


const MyPage = () => {
    let params = useParams().userId;
    console.log("params:", params)

    const dispatch = useDispatch();
    
    useEffect(() => {
        window.scrollTo({top:0, behavior:"smooth"});
    }, []);
    
    useEffect(() => {
        if (params === undefined || params === window.localStorage.getItem("userId")) {
            console.log("권한 주기@@@@@")
            dispatch(
                userAuthAction({
                    userAuth: true
                })      
            )
        } else {
            dispatch(
                userAuthAction({
                    userAuth: false
                })      
            )
        }
    }, [params, dispatch]);

    return (
        <div>
            <Header/>
            <Wrap>
                <MypageTop/>
                <MypagePost/>
            </Wrap>
            <Footer/>
        </div>
    );
};

const Wrap = styled.div`
    padding: 0rem 6.25rem;
`;

export default MyPage;
