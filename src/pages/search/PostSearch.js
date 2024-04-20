import styled from "styled-components";
import Card from "../home/Card";
import { MRegular32, LBold32 } from "../../components/style/Styled";

const PostSearch = () => {
    return(
        <div>
            <Wrap>
                <Left> 게시물 검색 결과 </Left>
                <Right><Num>3</Num>건</Right>
                
            </Wrap>
            {/* <PostWrap> */}
                <PageWrap>
                    <Card category="lifestyle"/>
                </PageWrap>
            {/* </PostWrap> */}

        </div>
    );
};

export default PostSearch;

const PageWrap = styled.div`
    margin: 0rem 6.25rem;
    /* box-sizing: border-box; */

/* 
    @media ${({ theme }) => theme.windowSize.test} {
        background-color: pink;
    } */
`
const Wrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    padding: 2.5rem 7rem 0rem 7rem;
`
const Left = styled(MRegular32)`
    display: flex;
    padding: 1.25rem 0rem;
    align-items: flex-start;
    gap: 0.625rem;

    color: var(--black, #000);
`
const Right = styled(MRegular32)`
    display: flex;
    padding: 1.25rem 0rem;
    align-items: flex-end;
    gap: 0.375rem;

    color: var(--gray_bold, #4A4A4A);
`

const Num = styled(LBold32)`
    color: var(--black, #000);
`