import styled from "styled-components";
import Comment from "./Comment";
import { useRef } from "react";

// 댓글 목록
const  PostComment = ({post}) => {
    const commentWriteRef = useRef(null); // 댓글달기 버튼 누르면 댓글 창 뜬 곳으로 scroll 하게
    return (
        <div>
            <CommentWrap ref={commentWriteRef}>
                <Comment post={post}/>
                {/* <ReplyComment/> */}
            </CommentWrap>
        </div>
    );
};

export default PostComment;

const CommentWrap = styled.div`
    width: 100%
    display: flex;
    // padding: 0rem 11.875rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.625rem;
    align-self: stretch;
`