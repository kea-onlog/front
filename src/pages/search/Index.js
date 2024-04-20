import Header from '../../components/common/Header';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom'; // 검색 입력값 가져오기
import SearchBox from './SearchBox';
import BlogSearch from './BlogSearch';
import PostSearch from './PostSearch';
import Footer from '../../components/common/Footer';
import { useEffect } from 'react';
import { LBold32, MRegular32 } from '../../components/style/Styled';

const SearchPage = () => {

    const location = useLocation();

    const term = location.state ? location.state.term : ''; // 검색값이 비어있을 경우(페이지 이동 혹은 주소로 쳐서 접근한 경우)

    useEffect(() => {
        window.scrollTo({top:0, behavior:"smooth"});
    }, []);
    
    return(
        <div>
            <Header/>
            <Wrap>
                <StickyWrap>
                    <SearchBoxWrap>
                        {term && <SearchTitle> <Highlight>"{term}"</Highlight>에 대한 검색 결과 <NumHighLight>4</NumHighLight>건 </SearchTitle>}
                        <SearchBox/>
                    </SearchBoxWrap>
                </StickyWrap>
                <BlogSearch/>
                <PostSearch/>
            </Wrap>
            <Footer/>
        </div>
    );
};

export default SearchPage;

const StickyWrap = styled.div`
    background-color: white;
    position: sticky;
    top: 0;
`

const Wrap = styled.div`
    padding: 0rem 6.25rem;
`
const SearchBoxWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    padding: 0rem 0rem 1.25rem 0rem;

    @media (max-width: 1282px) {
        flex-direction: column; /* 화면 크기가 1282px 이하일 때 세로로 정렬 */
        align-items: center; /* 아이템들을 가운데로 정렬 */
    }
`;

const SearchTitle = styled(MRegular32)`
    display: flex;
    flex-wrap: wrap;

    padding: 1.25rem 0rem;
    align-items: center;
    gap: 0.625rem;

    color: var(--gray_bold, #4A4A4A);
`

const Highlight = styled(LBold32)`
    color: var(--black, #000);
`
const NumHighLight = styled(LBold32)`
    color: var(--black, #000);
`