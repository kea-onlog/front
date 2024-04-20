import styled from "styled-components";
import React, { useState, Fragment, useEffect, useRef } from "react";
import CommentWrite from "./CommentWrite";
import { Delete_CommentLike, Post_CommentLike } from "../../apis/API_Like";
import { Delete_Comment, Put_Comment } from "../../apis/API_Comment";
import Swal from "sweetalert2";
import { SBold17, XSRegular16, XSSemibold16,XSBold13 } from "../../components/style/Styled";
import TextareaAutosize from 'react-textarea-autosize'; // npm install react-textarea-autosize
import { useNavigate } from "react-router-dom";


const Comment = ({post}) => {
    const [comments, setComments] = useState([]); // 초기값을 빈 배열로 설정

    // post.comments가 변경될 때마다 comments 상태 업데이트
    useEffect(() => {
        if (post.comments) {
            let sortedComments = [...post.comments].sort((a, b) => {
                if (b.ref - a.ref !== 0) {
                    return b.ref - a.ref;  // ref로 내림차순 정렬 (부모댓글 최신순으로 보여줌)
                } else {
                    if (a.step - b.step !== 0) {
                        return a.step - b.step;  // step으로 오름차순 정렬  (대댓글의 대댓글 뭐 이런 기능을 위한 거.. 일단은 막아놓을 예정)
                    } else {
                        return a.refOrder - b.refOrder;  // refOrder로 오름차순 정렬 (대댓글은 최신이 밑으로 쌓이게)
                    }
                }
            });
            setComments(sortedComments);
        }
    }, [post.comments]);
    

    // comment를 최신순서로 보여주기 위해 내림차순 정렬
    let sortedComments = [];
    if (comments) {
      sortedComments = [...comments].sort((a, b) => b.ref - a.ref);
    }
    const [isClicked, setIsClicked] = useState({}); // 답글 버튼 상태 관리 (눌렸는지 아닌지)

    // 답글 작성 버튼 핸들러 (각 댓글별로 상태관리)
    const replyBtnHandler = (commentId) => {
        setIsClicked(prevState => ({ ...prevState, [commentId]: !prevState[commentId] }));
      }

    // 댓글 좋아요 관리
    const HeartIcon = ({fill}) => ( // 좋아요 아이콘
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" viewBox="0 0 36 32" fill={fill}>
            <path d="M34.5 10.12C34.5 5.0834 30.6708 1 25.9478 1C22.34 1 19.2582 3.38213 18 6.75198C16.7435 3.38213 13.66 1 10.0522 1C5.32917 1 1.5 5.0834 1.5 10.12C1.5 11.8594 1.9563 13.4826 2.74801 14.8661C4.4336 18.561 8.49603 24.0007 18 31C27.504 24.0007 31.5664 18.561 33.252 14.8661C34.0437 13.4826 34.5 11.8594 34.5 10.12Z" stroke="#4A4A4A" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
    );
      
    const [likeStates, setLikeStates] = useState({}); // 좋아요 눌려있는지 상태 관리
    const [likesCount, setLikesCount] = useState({}); // 좋아요 수 count
    
    useEffect(() => {
        if (post && Array.isArray(post.comments)) { // post 객체와 post.comments 가 배열인지 확인
            let initialLikeStates = {};
            let initialLikesCount = {};
            post.comments.forEach(comment => {
                initialLikeStates[comment.commentId] = comment.commentLiked;
                initialLikesCount[comment.commentId] = comment.likesCount;
            });
            setLikeStates(initialLikeStates);
            setLikesCount(initialLikesCount);
        }
    }, [post]);

    // 좋아요 버튼 핸들러 (각 댓글 Id마다)
    const likeHandler = async (commentId) => {
        const isLiked = likeStates[commentId];
    
        if (isLiked) { // 좋아요 취소하기
            try {
                const response = await Delete_CommentLike(commentId); // Delete_CommentLike API 호출
        
                if (response && response.success) { // 응답이 있고, 응답의 success 가 true 일 때
                    setLikeStates(prevState => ({ ...prevState, [commentId]: false })); // 좋아요 상태를 false로 변경 (좋아요 - 상태 반영)
                    setLikesCount(prevState => ({ ...prevState, [commentId]: prevState[commentId] - 1 })); // 좋아요 수 감소
                    console.log('댓글 좋아요 취소');
                } else {
                    console.error(response ? response.error : 'No response from server'); // 실패 처리
                }
            } catch (error) {
                console.error('delete like catch error: ', error); // 오류 처리
            }
        } else { // 좋아요 누르기
            try {
                const response = await Post_CommentLike(commentId); // Post_PostLike API 호출
        
                if (response && response.success) { // 응답이 있고, 응답의 success 가 true 일 때
                    setLikeStates(prevState => ({ ...prevState, [commentId]: true })); // 좋아요 상태를 true로 변경 (좋아요 + 상태 반영)
                    setLikesCount(prevState => ({ ...prevState, [commentId]: prevState[commentId] + 1 })); // 좋아요 수 증가
                    console.log('댓글 좋아요 클릭');
                } else {
                    console.error(response ? response.error : 'No response from server'); // 실패 처리
                }
            } catch (error) {
                console.error(error); // 오류 처리
            }
        }
        
    };

    // 댓글 수정/삭제 버튼과 그거 보여지는 쩜쩜쩜 아이콘
    const [showButtons, setShowButtons] = useState([]);
    const toggleShowButtons = (commentId) => {
        setShowButtons(prev => {
            if (prev.includes(commentId)) {
                // 이미 표시 중인 경우 숨김
                return prev.filter(id => id !== commentId);
            } else {
                // 표시되지 않은 경우 표시
                return [...prev, commentId];
            }
        });
    };

    // 수정 중인 댓글의 ID를 저장하는 state
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingContents, setEditingContents] = useState({});
    const editingRef = useRef(null); // 텍스트 수정 시 바로 커서 깜빡이게

    // 수정할 텍스트 가장 오늘쪽으로 커서 자동 이동 & 깜빡깜빡
    useEffect(() => {
        if (editingCommentId && editingRef.current) {
            editingRef.current.focus();
            editingRef.current.selectionStart = editingRef.current.value.length;
            editingRef.current.selectionEnd = editingRef.current.value.length;
        }
    }, [editingCommentId]);

    // 댓글 수정하기 버튼 핸들러
    const editHandler = (commentId) => {
        console.log('댓글 수정 중, 댓글 Id : ',commentId);
        setEditingCommentId(commentId);
        setEditingContents({...editingContents, [commentId]: comments.find(comment => comment.commentId === commentId).content});
    }

    // 댓글 수정본 반영 버튼 핸들러
    const editConfirmHandler = async (commentId) => {
        const newContent = editingContents[commentId];
        const originalContent = comments.find(comment => comment.commentId === commentId).content;

        // 원래 댓글과 수정된 댓글이 같은 경우 - 수정반영 하면 안됨! 빠꾸시키고 다시 입력하도록.
        if (newContent === originalContent) {
            Swal.fire({
                icon: "warning",
                title: "댓글이 수정되지 않았습니다.", 
                text: "수정 내용을 입력해주세요!"
                }
            )
        } else { // 정상적으로 수정내용이 등록되었을 때, 댓글 수정 api 호출
            try {
                // const ContentWithLineBreaks = newContent.replace(/\n/g, '<br>'); // \n을 <br>로 변경하여 줄바꿈 표시
                const response = await Put_Comment(commentId, newContent); // Put_Comment API 호출

                if (response && response.success) { // 응답이 있고, 응답의 success 가 true 일 때
                    console.log('댓글 수정 완료. Id : ',commentId, "내용: ",newContent);
                    // Swal.fire('댓글이 수정되었습니다', 'success');
                    // 댓글 리스트 업데이트
                    setComments(comments.map(comment => {
                        if(comment.commentId === commentId) {
                            return { ...comment, content: newContent };
                        }
                        return comment;
                    }));
                    setEditingCommentId(null);
                } else {
                    console.error(response ? response.error : 'No response from server'); // 실패 처리
                }
            } catch (error) {
                console.error('update comment catch error: ', error); // 오류 처리
            }
        }
    }
    //댓글 수정하기 취소 버튼 핸들러
    const editCancleHandler = () => {
        setEditingCommentId(null);
        console.log('댓글 수정 취소');
    }

    // 댓글 삭제하기 버튼 핸들러
    const deleteHandler = async (commentId) => {
        // Swal.fire({
        //     title: '정말로 댓글을 삭제하시겠습니까?',
        //     text: '삭제된 댓글은 복구가 불가능합니다.',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: '삭제',
        //     cancelButtonText: '취소',
        //     reverseButtons: true,
        // }).then(async result => {
        //     if (result.isConfirmed) {
        //         try {
        //             const response = await Delete_Comment(commentId); // Delete_Comment API 호출

        //             if (response && response.success) { // 응답이 있고, 응답의 success 가 true 일 때
        //                 console.log('댓글 삭제');
        //                 Swal.fire('댓글이 삭제되었습니다', 'success');
        //                 // 삭제 후 삭제된 댓글 리스트 다시 보여주기
        //                 const updatedComments = comments.filter(comment => comment.commentId !== commentId);
        //                 setComments(updatedComments);

        //             } else {
        //                 console.error(response ? response.error : 'No response from server'); // 실패 처리
        //             }
        //         } catch (error) {
        //             console.error('delete comment catch error: ', error); // 오류 처리
        //         }
        //     }
        // });
        try {
            const response = await Delete_Comment(commentId); // Delete_Comment API 호출

            if (response && response.success) { // 응답이 있고, 응답의 success 가 true 일 때
                console.log('댓글 삭제');
                // Swal.fire('댓글이 삭제되었습니다', 'success');
                // 삭제 후 삭제된 댓글 리스트 다시 보여주기
                const updatedComments = comments.filter(comment => comment.commentId !== commentId);
                setComments(updatedComments);

            } else {
                console.error(response ? response.error : 'No response from server'); // 실패 처리
            }
        } catch (error) {
            console.error('delete comment catch error: ', error); // 오류 처리
        }
    };

    const navigate = useNavigate();
    const handleProfileClick = (commentId) => {
        console.log("commentId: ", commentId)
        if(commentId === window.localStorage.getItem("userId")){
            navigate(`/mypage`)
        } else {
            navigate(`/mypage/${commentId}`)
        }
    }
    return (
        <div>
        {sortedComments && sortedComments.map(comment => {
            // 현재 사용자와 댓글 작성자를 비교
            const userId = window.localStorage.getItem("userId");
            const isAdmin = userId === comment.writer.blogId;

            return (
            <Fragment key={comment.commentId}>
                {editingCommentId === comment.commentId ? (
                    // 수정 중인 댓글인 경우
                    <WrapEdit key={comment.commentId}>
                        {/* 댓글 작성자 프로필 & 수정댓글 저장하기 버튼 */}
                        <UserInfo>
                            <Menu>
                                <ProfileImg $profileImg={comment.writer && comment.writer.blogProfileImg}></ProfileImg>
                                <TitleWrap>
                                    <BlogName>{comment.writer && comment.writer.blogName}</BlogName>
                                </TitleWrap>
                                <EditSubmitBtn onClick={() => editConfirmHandler(comment.commentId)}>저장하기</EditSubmitBtn>
                                <EditSubmitBtn style={{border:"none"}} onClick={editCancleHandler}>취소하기</EditSubmitBtn>
                            </Menu>
                        </UserInfo>
                        <EditingName>댓글 수정 중...</EditingName>

                        {/* 댓글 내용 */}
                        {/* <ContextEdit type='text' value={comment.content} style={{ overflow: 'hidden' }} onChange={EditContextHandler}> {comment.content} </ContextEdit> */}
                        <ContextEdit
                            ref={editingRef}
                            value={editingContents[comment.commentId] || comment.content}
                            onChange={(e) => setEditingContents({...editingContents, [comment.commentId]: e.target.value})}
                            style={{ overflow: 'hidden' }}
                        />
                    </WrapEdit>
                ) : (
                    <Wrap key={comment.commentId}>
                        {/* 댓글 작성자 프로필 & 수정/삭제 버튼 */}
                        <UserInfo>
                            {/* 서진------------------------------------------------ */}
                            <Menu onClick={() => handleProfileClick(comment.writer.blogId)}>
                            <ProfileImg $profileImg={comment.writer && comment.writer.blogProfileImg}></ProfileImg>
                            <TitleWrap>
                                <BlogName>{comment.writer && comment.writer.blogName}</BlogName>
                                <NickName>@{comment.writer && comment.writer.blogNickname}</NickName>
                            </TitleWrap>
                            </Menu>
                            {/* 댓글작성자 본인인 경우만 수정/삭제 버튼 노출 */}
                            {isAdmin && (
                                <UserWrap>
                                    {/* 쩜쩜쩜 눌렀을 때만 수정/삭제 버튼 보여지게 */}
                                    {!showButtons.includes(comment.commentId) && 
                                        <DotButton onClick={() => toggleShowButtons(comment.commentId)}>
                                            <DotIcon/>
                                        </DotButton>
                                    }
                                    {showButtons.includes(comment.commentId) && (
                                        <>
                                            <UserBtn onClick={() => {
                                                editHandler(comment.commentId);
                                                toggleShowButtons(comment.commentId);
                                            }}>수정하기</UserBtn>
                                            <UserBtn style={{border: "none"}} onClick={() => {
                                                deleteHandler(comment.commentId);
                                                toggleShowButtons(comment.commentId);
                                            }}>삭제하기</UserBtn>
                                        </>
                                    )}
                                </UserWrap>
                            )}
                        </UserInfo>
                        {/* 댓글 내용 엔터 적용해서 보여주기 */}
                        <Context>
                            {comment.content.split('\n').map((line, index) => (
                                <React.Fragment key={index}>{line}<br/></React.Fragment>
                            ))}
                        </Context>
                        <CommentFooter>
                            {/* 댓글 작성 날짜 */}
                            {comment.createdAt && <CommentDate>{new Date(comment.createdAt).toISOString().split('T')[0].replace(/-/g, '.')}</CommentDate>}
                            {/* 좋아요 버튼 & 좋아요 개수 */}
                            <HeartReplyWrap>
                            <HeartWrap>
                                <LikeButton onClick={() => likeHandler(comment.commentId)}>
                                <HeartIcon fill={likeStates[comment.commentId] ? "red" : "none"} />
                                </LikeButton>
                                <LikeNum>{likesCount[comment.commentId]}</LikeNum>
                            </HeartWrap>
                            {/* 답글 버튼 */}
                            <ReplyButton onClick={() => replyBtnHandler(comment.commentId)}> 답글달기 </ReplyButton>
                            </HeartReplyWrap>
                        </CommentFooter>
                    </Wrap>
                )}
                {/* 답글 버튼 누르면 답글 작성 칸 등장 */}
                {isClicked[comment.commentId] && <CommentWrite/>}
            </Fragment>
            );
        })}
        </div>
    );
};

export default Comment;

const WrapEdit = styled.div`
    display: flex;
    padding: 2rem 2rem 2rem 2rem;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: stretch;
    border-bottom: 1px solid var(--gray_lighter, #DCDCDC);
`
const EditingName = styled(XSBold13)`
    padding:0.5rem 0rem 0rem 4rem;
    color: red;
`
const EditSubmitBtn =  styled.button`
    // margin: 1rem;
    padding: 0rem 1rem;
    background: none;
    border: none;
    border-right: 1px solid gray;
    cursor: pointer;
    color: gray;

    &:hover{
        color: red;
        transition : 0.3s;
    }
`
const Wrap = styled.div`
    display: flex;
    padding: 1rem 1rem 0rem 1rem;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-self: stretch;
    border-bottom: 1px solid var(--gray_lighter, #DCDCDC);
`
const Menu = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
`;
const ProfileImg = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 2.5rem;
    background: url(${props => props.$profileImg}) lightgray 50% / cover no-repeat;
    margin-right: 0.94rem;
`;
const TitleWrap = styled.div`
    text-decoration: none;
    color: var(--black);
`;
const BlogName = styled(SBold17)`
    text-align: justify;
    color: var(--black, #000);
    text-align: justify;
`;
const NickName = styled(XSRegular16)`
    color: var(--gray_bold, #4A4A4A);
    text-align: justify;
`;
const UserInfo = styled.div`
    display: flex;
    justify-content: space-between;
    padding-left: 1.5rem;
    align-items: center;
    align-self: stretch;
`
// 수정삭제 쩜쩜쩜 버튼
const DotButton = styled.button`
    display: flex;
    width: 3rem;
    height: 3rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    cursor: pointer;

    background-color: transparent;
    border: none;
`
// 수정삭제 쩜쩜쩜 아이콘
const DotIcon = ({fill}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M24 16C26.2 16 28 14.2 28 12C28 9.8 26.2 8 24 8C21.8 8 20 9.8 20 12C20 14.2 21.8 16 24 16ZM24 20C21.8 20 20 21.8 20 24C20 26.2 21.8 28 24 28C26.2 28 28 26.2 28 24C28 21.8 26.2 20 24 20ZM20 36C20 33.8 21.8 32 24 32C26.2 32 28 33.8 28 36C28 38.2 26.2 40 24 40C21.8 40 20 38.2 20 36Z" fill="#4A4A4A"/>
    </svg>
);
// 수정삭제 버튼 wrap
const UserWrap = styled.div`
    display: flex;
    flex-direction: row;
`
// 수정하기 삭제하기 버튼
const UserBtn = styled.button`
    display: flex;
    padding: 0rem 1rem;
    background: none;
    border: none;
    border-right: 1px solid gray;
    text-align: justify;
    color : gray;

    /* XS-semibold-20 */
    font-family: Pretendard;
    font-size: 0.8rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    cursor: pointer;

    &:hover {
        color: black;
        transition: 0.3s;
    }
    // 클릭 액션
    &:active{
        color: black; 
    }
`
// 댓글 내용
const Context = styled(XSRegular16)`
    width: 50rem;
    align-self: stretch;
    color: var(--black, #000);
    padding: 1.25rem 1.25rem 0rem 2rem;
`
const ContextEdit = styled(TextareaAutosize)`
    width: 44.625rem;
    display: flex;
    margin: 1rem 3rem;
    padding: 1rem;
    align-items: center;
    align-self: stretch;
    border: none;
    resize: none;

    color: var(--gray_bold, #4A4A4A);

    /* XS-regular-16(RE) */
    font-family: Pretendard;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.03rem;

    &:hover{
        /* background-color: #e5e5e5; */
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.25);
    }
`
// 댓글 작성 날짜, 좋아요, 답장
const CommentFooter = styled.div`
    display: flex;
    justify-content: space-between;
    padding-left: 2rem;
    align-items: center;
    align-self: stretch;
`
const CommentDate = styled(XSSemibold16)`
    color: var(--gray_bold, #4A4A4A);
`
const HeartReplyWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 0.625rem;
`
const HeartWrap = styled.div`
    display: flex;
    width: 3rem;
    padding: 0.1875rem 1.25rem;
    align-items: center;
`
const LikeButton = styled.button`
    display: flex;
    width: 3rem;
    height: 3rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;

    cursor: pointer;
`
const LikeNum = styled(XSSemibold16)`
    color: var(--gray_bold, #4A4A4A);
    text-align: justify;
`
const ReplyButton = styled.button`
    display: flex;
    padding: 0rem 1rem;
    margin: 0.5rem 0rem;
    align-items: center;
    color: var(--gray_bold, #4A4A4A);
    text-align: justify;
    background-color: transparent;
    border: none;
    border-left: 2px solid black;

    cursor: pointer;

    /* XS-semibold-20 */
    font-family: Pretendard;
    font-size: 0.8rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    &:hover{
        transition: 0.3s;
        color: red;
    }
`