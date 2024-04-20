import styled from "styled-components"
import { useLocation, useNavigate } from "react-router-dom";
import { SBold192 , SBold28, SRegular20} from "../../components/style/Styled";
import { useState, useEffect } from "react";
import Header from "../../components/common/Header";
import {ReactComponent as Arrow} from '../../assets/images/Icons/Next.svg';
// import TextareaAutosize from 'react-textarea-autosize'; // npm install react-textarea-autosize
import { Post_Post } from "../../apis/API_MyPage";


const CreateAI = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [props, setProps] = useState({
        ...location.state.data
      });
    const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
    const [thumbImageUrl, setThumbImageUrl] = useState(props.thumbnailLink[0])
    useEffect(() => {
        if (props.thumbnailLink.length > 0) {
            setThumbnailLoaded(true);
            console.log('썸네일들 : ',props.thumbnailLink);
        }
    }, [props.thumbnailLink]);

    
    useEffect(() => {
        console.log("props 테스트:", props);
    },[props])

    useEffect(() => {
        window.scrollTo({top:0, behavior:"smooth"});
    }, []);

    // 제목 입력시 변경사항 반영
   const TitleHandler = (e) => {
        setProps({
            ...props,
            title: e.currentTarget.value
        })
    }

    // AI 사진 slider
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        setThumbImageUrl(props.thumbnailLink[slideIndex]);
        console.log('썸네일 : ', thumbImageUrl);
        setProps({
            // ...props,
            thumbImageUrl: props.thumbnailLink[slideIndex]
        })
    }, [slideIndex, props.thumbnailLink, thumbImageUrl]);
    const moveToPrevSlide = () => {
        setSlideIndex((prev) => (prev === 0 ? props.thumbnailLink.length - 1 : prev - 1));
      };
    
      const moveToNextSlide = () => {
        setSlideIndex((prev) => (prev === props.thumbnailLink.length - 1 ? 0 : prev + 1));
      };
      

    // // 요약글 수정
    // const SummaryEditHandler = (e) => {
    //     setProps({
    //         ...props,
    //         summary: e.currentTarget.value
    //     })    }

    // 글 작성 버튼 클릭
    const SubmitHandler = async () => {
        console.log("SubmitHandlerrrrrrrrrrrrr")
        const response = await Post_Post(props);

        if (response.success) {
            console.log("글 작성 완료!");
            navigate(`/postview/${response.data.postId}`);
            console.log(response);
            alert('글 작성');
        } else {
            console.error("글 작성 실패! :", response.message);
        }
    }

    return(
        <>
            <Header/>
            <Wrap>
                <Title>제목</Title>
                <TitleInput type='text' value={props.title} style={{ overflow: 'hidden' }} placeholder="제목을 입력하세요" onChange={TitleHandler}/>

                {/* 썸네일 이미지 추천 전체 박스 */}
                <AiWrap>
                    <ThumbTitle>
                        <div> 썸네일 이미지 추천 </div>
                        <UseMyImage> 내 이미지 가져오기</UseMyImage>
                    </ThumbTitle>

                    {/* 썸네일 추천 이미지 보여주는 슬라이드 & 좌우버튼 */}
                    {thumbnailLoaded && (
                        <ThumbSelectWrap>
                        <ArrowBtn direction="prev" onClick={moveToPrevSlide}> <Arrow/> </ArrowBtn>
                        {props.thumbnailLink.map((character, index) => (
                            <Slide key={index} className={index === slideIndex ? "active" : null} >
                            <Images $thumbImg={character}/>
                            </Slide>
                        ))}
                        <ArrowBtn $flip direction="next" onClick={moveToNextSlide}> <Arrow/> </ArrowBtn>
                    </ThumbSelectWrap>
                    )}
                    <SummaryWrap>
                        <SummaryTitle> 세 줄 요약 </SummaryTitle>
                        {/* <SummaryContent type='text' value={props.summary} style={{ overflow: 'hidden' }} placeholder="요약" onChange={SummaryEditHandler}/> */}
                        <Summary dangerouslySetInnerHTML={{__html: props.summary}}/>
                    </SummaryWrap>
                </AiWrap>

                <BtnWrap>
                    <NextBtn onClick={SubmitHandler}>작성</NextBtn>
                </BtnWrap>
            
            </Wrap>
        </>
    )
}

export default CreateAI;
const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.25rem 7.5rem;
    align-items: center;
    gap: 1.875rem;
    align-self: stretch;
`
const Title = styled(SBold192)`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`
const TitleInput = styled.input`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 1rem 0rem 1rem 1rem;
    border: none;
    border-bottom: 1.5px solid var(--gray_bold, #4A4A4A);

    resize: none;

    color: var(--gray_bold, #4A4A4A);

    /* S-regular_20(RE) */
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2.3rem; /* 184% */
    letter-spacing: 0.0125rem;

    &:hover{
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
    }
`
const AiWrap = styled.div`
    display: flex;
    width: 68.0625rem;
    padding: 5.625rem 3.375rem 9.375rem 3.375rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 3.375rem;

    border-radius: 6.25rem 6.25rem 0rem 0rem;
    background: var(--black, linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #000);
`
const ThumbTitle = styled(SBold28)`
    display: flex;
    padding-bottom: 0px;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;

    color: var(--gray_light, #939393);
`
const UseMyImage = styled.button`
    cursor: pointer;
    border: none;
    background: transparent;
    color: var(--gray_light, #939393);

    font-family: Pretendard;
    font-size: 1.5625rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-decoration-line: underline;

    &:hover{
        color: white;
        font-size: 1.6rem;
        transition : color 0.3s, font-size 0.3s;
    }
`
const ThumbSelectWrap = styled.div`
    height: 50rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5.5625rem;
    align-self: stretch;
    position: relative
`
const ArrowBtn = styled.button`
    position: absolute;
    background-color: transparent;
    border:none;
    outline:none;
    cursor:pointer;
    svg {
        transform: ${props => props.$flip ? 'scaleX(-1)' : 'none'}; // 오른쪽 화살표는 좌우반전!
    }

    // Prev 버튼인 경우 left: 0, Next 버튼인 경우 right: 0
    left: ${({ direction }) => direction === "prev" && "0px"};
    right: ${({ direction }) => direction === "next" && "0px"};
    z-index: 1;

`
const Images = styled.div`
    width: 37.5rem;
    height: 37.5rem;
    background-color: white;
    background: url(${props => props.$thumbImg}) 50% / cover no-repeat;

`
const SummaryWrap = styled(SRegular20)`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
`
const SummaryTitle = styled(SBold192)`
    color: var(--gray_light, #939393);
`
/* const SummaryContent = styled(TextareaAutosize)`
    width: 100%;
    display: flex;
    padding: 1rem 1rem 1rem 1rem;
    align-items: center;
    gap: 0.625rem;
    border: 1px solid black;
    background-color: transparent;
    outline: none;
    resize: none;

    color: var(--white, #FFF);
    font-family: Pretendard;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2.3rem; 
    letter-spacing: 0.0125rem;
    white-space: pre-wrap; // 줄바꿈 허용

    &:hover{
        border : 1px solid white;
        transition: 0.3s;
    }
` */
const Summary = styled(SRegular20)`
    width: 100%;
    color: white;
    text-align: justify;

    line-height: 2.3rem;
`
const BtnWrap = styled.div`
    padding-Left:5rem;
    padding-Right:5rem;
`
const NextBtn = styled.button`
    display: flex;
    padding: 0.75rem 4.0625rem;
    align-items: center;
    gap: 0.9375rem;

    border: none;
    background: black;
    color: white;
    cursor: pointer;

    text-align: justify;

    /* S-bold-25 */
    font-family: Pretendard;
    font-size: 1.5625rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    transition: 0.3s ease-in-out;

    &:hover{
        color: black;
        background: white;
        box-shadow: inset 0 0 0 5px black;
    }
`
const Slide = styled.div`
  position: absolute;

// Slide 내부 가운데 정렬
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;

  opacity: 0;
  &.active {
    opacity: 1;
  }
  transition: opacity 0.3s ease-in-out;
`;