import Header from '../../components/common/Header';
import PostHeader from './PostHeader';
import PostText from './PostText';
import PostComment from './PostComment';
import PostThumb from './PostThumb';
import CommentWrite from './CommentWrite';
import Footer from '../../components/common/Footer';
import styled from 'styled-components';
import { useEffect, useState, React } from 'react';
import { Get_SinglePost } from '../../apis/API_Postview';
import { useParams } from "react-router-dom";
import { Get_follow } from '../../apis/API_Subs';

const PostviewPage = () => {
    const [post, setPost] = useState([]);
    const { postId } = useParams(); // URL에서 postId 가져오기
    const [isSubs, setIsSubs] = useState(null);

    // 게시글 데이터 조회
    useEffect(() => {
        window.scrollTo({top:0, behavior:"smooth"});

        const fetchPosts = async () => {
            const data = await Get_SinglePost(postId);

            // console.log("응답 메시지: ", data);
            // console.log(data.data);
            // if(data.code===403){
            //     alert("비공개 게시글은 조회할 수 없습니다.");
            // }
            // else{
                setPost(data.data);
            // }
        }
        fetchPosts();
      }, [postId]);

      // 게시글 작성자 구독중 여부 판단 API
      useEffect(() => {
        const fetchFollow = async () => {
            const response = await Get_follow();
            if (response.success) {
                console.log("구독 리스트 조회 성공", response.data);
                // 조회된 구독자 리스트 중에 내가 지금 보고있는 포스팅 주인의 아이디가 있는지 확인하고
                const foundItem = response.data.find(item => item.followId === post.writer.blogId);
                if(foundItem && foundItem.following){ // 그 사람의 following 상태를 저장
                    setIsSubs(true);
                }
                else{
                    setIsSubs(false);
                }
            } else {
                console.error("구독 리스트 조회 실패", response.message);
            }
        }
        if (post.writer) { // post.writer 가 존재할 때만 fetchFollow 실행 (렌더링 초기에 undefined 문제 방지)
            fetchFollow(); 
        }   
      },[post.writer]);

    // isSubs가 반영되기 전에는 렌더링 x
    if (isSubs === null) {
        return null;
    }

    return(
        <div>
            <StickWrap>
                <Header/>
                <Wrap>
                    <PostHeader post={post}/>
                </Wrap>
            </StickWrap>
            <Wrap>
                {/* 작성자 프로필 / 썸네일 사진 / 3줄 요약 글 */}
                <PostThumb post={post} isSubs={isSubs}/>

                {/* 게시글 내용 / 좋아요 수 / 수정 버튼 / 삭제 버튼 */}
                <PostText post={post}/>

                {/* 댓글목록*/}
                <PostComment post={post}/>

                {/* 댓글 작성 칸 + 댓글 작성 버튼 */}
                <CommentWrite post={post}/>
            </Wrap>

            <Footer/>
        </div>
    )
}

export default PostviewPage;

const Wrap = styled.div`
    padding: 0rem 24.25rem;
    // padding-left: 18rem;
    // padding-right: 18rem;
    // margin-left: 18rem;
    // margin-right: 18rem;
`

const StickWrap = styled.div`
    position: sticky;
    top: 0;
`