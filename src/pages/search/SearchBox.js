import styled from "styled-components";
import Search from '../../assets/images/Icons/Search.png'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import Swal from "sweetalert2";

const SearchBox = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

      const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            if(searchTerm.trim() !== '') { // 입력값이 있는 경우 페이지 이동
                navigate('/search', { state: { term: e.target.value } }); // 검색 결과 페이지로 이동
            } else {
                // 입력값이 없는 경우 입력하라고 경고창
                Swal.fire({
                    // icon: "warning",
                    title: "검색어를 입력해주세요!"}
                )
            }
    }
      }

    
    return(
        <div>
            {/* <Wrap> */}
                <SearchWrap>
                    <img src={Search} alt="search"/>
                    <input type="text" value={searchTerm} placeholder="검색하기" onChange={(e) => setSearchTerm(e.target.value)} onKeyPress={handleOnKeyPress}/>
                </SearchWrap>
            {/* </Wrap> */}
        </div>
    );
};

export default SearchBox;

// const Wrap = styled.div`
//     display: flex;
//     justify-content: space-between;
//     align-items: flex-start;
//     align-self: stretch;
//     // padding: 0rem 6.25rem 1.25rem 6.25rem;
// `;
const SearchWrap = styled.div`
    display: flex;
    width: 35.9375rem;
    padding: 0.5rem 1.5625rem;
    justify-content: flex-end;
    align-items: center;
    gap: 0.625rem;
    border-radius: 1.875rem;
    border: 1px solid var(--gray_light, #939393);

    input {
        width: 100%;
        border: none;
        outline: none;

        color: var(—gray_bold, #4A4A4A);

        /* S-regular-20.8(RE) */
        font-family: Pretendard;
        font-size: 1.3rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`;