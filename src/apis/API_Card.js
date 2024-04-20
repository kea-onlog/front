import axios from "axios";

export const GET_CardList = async (filterList) => {
    const accessToken = window.localStorage.getItem("accessToken");
    console.log("test:", filterList);

    const url = '/posts';
    const res = await axios({
        method: "get",
        url: url,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        params: {
            topic: filterList.topic,
            hashtag: filterList.hashtag,
            blog_id: filterList.blog_id,
            category_id: filterList.category_id,
            page: 0,
            size: 20,
            sort: "string"
        }
    });

    return res.data; 
}
