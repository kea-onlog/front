import styled from "styled-components";
import { useState } from "react";
import { Post_Comment } from "../../apis/API_Comment";
// import { useNavigate } from "react-router-dom";

const CommentWrite = ({post}) => {
    // const navigate = useNavigate();
    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState({
        postId: "",
        content: "",
        parentCommentId: "",
    });

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    }

    const handleSubmit = async () => {
        if(inputText.trim() === "") {
            alert("댓글을 입력해주세요!");
            return;
        }

        const newMessages = {
            ...messages,
            postId: post.postId,
            content: inputText,
            parentCommentId: null,
        };
        setMessages(newMessages);

        // console.log('댓글:', newMessages);

        const response = await Post_Comment(newMessages);

        if (response.success) {
            console.log("Comment posted successfully!");
            // navigate(`/postview/${newMessages.postId}`);
        } else {
            console.error("Failed to post comment:", response.message);
        }

        setInputText("");
    }

    return(
        <Wrap>
            <WriteWrap type="text" value={inputText} onChange={handleInputChange}/>
            <Sendbtn onClick={handleSubmit}>
                댓글달기
            </Sendbtn>
        </Wrap>
    );
};


export default CommentWrite;

const Wrap = styled.div`
    padding: 1rem 2rem 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

`

const WriteWrap = styled.textarea`
    height: auto;
    min-height: 3rem;
    display: flex;
    padding: 2.5rem 1.875rem 2.5rem 3.125rem;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: stretch;
    background: black;
    color: white;
    
    border: none;
    outline: none;
    resize: none;
`

const Sendbtn = styled.button`
    display: flex;
    padding: 0.5rem 1rem;
    margin-top: 0.5rem;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 0.9375rem;

    color: var(--black, #000);
    background: var(--white, #FFF);

    text-align: justify;
    /* S-bold-19.2(RE) */
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    border: 2px solid black;
    cursor: pointer;

    &:hover{
        background: var(--black, #000);
        color: var(--white, #FFF);

        transition: 0.3s;
    }
`
