import axios from "axios";

export const Post_Recommendation = async(content, tagList) => {
    const url = '/recommendation';
    try {
        const res = await axios({
            method: "post",
            url: url,
            data: {
                content: content,
                hashtag: tagList,
            }
        });
        // console.log('ai 추천 api 성공!');
        // console.log('추천api에서 summary : ', res.data.data.summary);
        console.log('추천api에서 thumbnailLink : ', res.data.data.imageUrl);
        return res.data;
    } catch (error) {
        console.log('ai 추천 api 실패:',error.response);
        console.error('ai 추천 api 실패: ', error);
        return { success: false, error: error.message };
    }
}