import axios from "axios";
const url = '/blog/follow';

export const Get_follow = async () => {
    const accessToken = window.localStorage.getItem("accessToken");

    try {
        const res = await axios({
            method: "get",
            url: url,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        console.log('구독자 리스트 : ', res.data.data);
        return res.data;
    } catch (error) {
        console.error("팔로우 리스트 조회 중 에러 발생:", error);
        
        // 오류 응답의 데이터를 출력
        if (error.response) {
            console.error("Error response data(get follow):", error.response.data);
        }
    }
}

export const Post_follow = async (targetId) => {
    const accessToken = window.localStorage.getItem("accessToken");
    try{
        const res = await axios({
            method: "post",
            url: url,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            data: {
                targetBlogId: targetId
            }
        });
        console.log('구독 완료');
        return res.data;
    } catch(error){
        // 오류 응답의 데이터를 출력
        if (error.response) {
            console.error("Error response data(post follow):", error.response.data);
        }
    }
}

export const Delete_Follow = async (targetId) => {
    const accessToken = window.localStorage.getItem("accessToken");
    try{
        const res = await axios({
            method: "delete",
            url: url,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            data: {
                targetBlogId: targetId
            }
        });
        console.log('구독 취소');
        return res.data;
    } catch(error){
        // 오류 응답의 데이터를 출력
        if (error.response) {
            console.error("Error response data(delete follow):", error.response.data);
        }
    }
}

export const Get_SubProfile = async (userId) => {
    const accessToken = window.localStorage.getItem("accessToken");

    const url = '/blog';
    const res = await axios({
        method: "get",
        url: url,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        params: {
            'blog_id': userId
        }  
    });
    return res.data;
}