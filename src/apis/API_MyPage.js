import axios from "axios";

export const Get_Profile = async (userId) => {
    const accessToken = window.localStorage.getItem("accessToken");
    console.log("userId api:", userId);
    // const userId = window.localStorage.getItem("userId");
    // const accessToken = useSelector(state => state.login.token.accessToken);

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
export const Put_Profile = async (inputValue) => {
    const accessToken = window.localStorage.getItem("accessToken");
    const url = '/blog';
    const res = await axios({
        method: "put",
        url: url,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        data: {
            "blogName": inputValue.blogName,
            "blogNickname": inputValue.nickName,
            "blogIntro": inputValue.info,
            "blogProfileImg": inputValue.profileImg
        }
    })
    return res.data;
}

// 카테고리 관련
export const Get_Categori = async (userId) => {
    const accessToken = window.localStorage.getItem("accessToken");

    const url = '/blog/categories';
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
export const Post_Categori = async (inputValue) => {
    const accessToken = window.localStorage.getItem("accessToken");

    const url = '/blog/categories';
    const res = await axios({
        method: "post",
        url: url,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        data: {
            name: inputValue,
        }
    });

    return res.data;
}

export const Post_Post = async(input) => {
    console.log("input:", input);
    const accessToken = window.localStorage.getItem("accessToken");
    const url = '/posts';
    const res = await axios({
        method: "post",
        url: url,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        data: {
            title: input.title,
            content: input.content,
            summary: input.summary,
            // thumbnailLink: input.thumbnailLink[0],
            thumbnailLink: input.thumbImageUrl,
            isPublic: input.isPublic,
            categoryId: input.category,
            hashtagList: input.tagList,
            topicId: input.topic
        }
    });

    return res.data;
}