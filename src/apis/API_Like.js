import axios from "axios";

const accessToken = localStorage.getItem('accessToken');

export const Post_PostLike = async (postId) => {
    const url = '/posts/like';

    try {
        const response = await axios({
            method:"post",
            url: url,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            data: {
                postId: postId,
            }
        });
        return response.data;
    } catch (error) {
        console.error('post post like error: ', error);
        return { success: false, error: error.message };
    }
};

export const Delete_PostLike = async (postId) => {
    const url = '/posts/like';

    try {
        const response = await axios({
            method:"delete",
            url: url,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            data: {
                postId: postId,
            }
        });
        return response.data;
    } catch (error) {
        console.error('delete post like error: ', error);
        return { success: false, error: error.message };
    }
}

export const Post_CommentLike = async (commentId) => {
    const url = '/post/comments/like';

    try {
        const response = await axios({
            method:"post",
            url: url,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            data: {
                commentId: commentId,
            }
        });
        return response.data;
    } catch (error) {
        console.error('post comment like error: ', error);
        return { success: false, error: error.message };
    }
};

export const Delete_CommentLike = async (commentId) => {
    const url = '/post/comments/like';

    try {
        const response = await axios({
            method:"delete",
            url: url,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            data: {
                commentId: commentId,
            }
        });
        return response.data;
    } catch (error) {
        console.error('delete comment like error: ', error);
        return { success: false, error: error.message };
    }
}