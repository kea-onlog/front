import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { profileAction } from '../../store/actions/profile';

import { useNavigate } from 'react-router-dom';

const KakaoMiddle = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
    
        const fetchData = async () => {
            // code(인가코드)는 서버로 보내기
            try {
                const code = new URL(window.location.href).searchParams.get("code"); // 현재 url의 파라미터 가져오기 + 파라미터 안에서 'code'값 가져오기            
                console.log("인가코드:",code);

                const url = `/auth/kakao/login?code=${code}`;
                const res = await axios({
                    method: "get",
                    url: url,
                });

                if(res.data.success) {
                    console.log(res.data);

                    dispatch(
                        profileAction({
                            userId: res.data.data.memberIdx,
                            email: res.data.data.email,

                        }),
                    );
                    window.localStorage.setItem("accessToken", res.data.data.tokenInfo.accessToken);
                    window.localStorage.setItem("email", res.data.data.email);
                    window.localStorage.setItem("userId", res.data.data.memberIdx);
                    window.localStorage.setItem("profileImg", res.data.data.profileImgUrl);

                    // window.localStorage.setItem("refreshToken", res.data.data.tokenInfo.refreshToken);
                    
                    navigate("/signUp");
                } 
                else {
                    console.log(res.data);
                }

            } catch(error) {
                console.log(error);
            }
        };

        fetchData();
    },[dispatch, navigate])


    return (
        <div>
            
        </div>
    );
};

export default KakaoMiddle;