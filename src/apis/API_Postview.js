import axios from "axios";

const accessToken = localStorage.getItem('accessToken');

export const Get_SinglePost = async (postId) => {
    try{
        const response = await axios({
            method: "get",
            url: `/posts/${postId}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return response.data;
    } catch (error) {
        console.log("상세 보기 중 에러 발생:", error);
    }
};

export const Delete_SinglePost = async (postId) => {
    try {
        const response = await axios({
            method:"delete",
            url: `/posts`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            data: {
                postId: postId,
            }
        });
        console.log('delete post api success');
        return response.data;
    } catch (error) {
        console.log('delete post error:',error.response);
        console.error('delete post error: ', error);
        return { success: false, error: error.message };
    }
}

export const Put_SinglePost = async (input) => {
    const url = '/posts';
    const res = await axios({
        method: "put",
        url: url,
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        data: {
            postId: input.postId,
            title: input.title,
            content: input.content,
            summary: input.summary,
            thumbnailLink: input.thumbnailLink,
            isPublic: input.isPublic,
            categoryId: input.category,
            hashtagList: input.tagList,
            topicId: input.topic
        }
    });

    return res.data;
}