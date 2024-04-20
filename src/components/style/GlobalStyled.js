import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
    ${reset}
    :root{
        /* Fonts */
        /* --font-pretendard: Pretendard;
        --font-Pretendard: Pretendard;
        --font-Pretendard: Pretendard;   */

        /* Colors */
        --white: #fff;
        --black: #000;
        --gray-bold: #4a4a4a;
        --gray-light: #939393;
        --color-gray-100: rgba(255, 255, 255, 0.7);
        --color-red: #ff0000;
        
        /* 주제 메인 색상 */
        --tag-lifestyle: #FF7575;
        --tag-travel: #88D67C;
        --tag-foodie: #C0904A;
        --tag-entertain: #C090C3;
        --tag-tech: #5943E2;
        --tag-sports: #3070EE;
        --tag-news:#F3CC40;

    }    
    body {

        /* padding: 20px; 원하는 패딩 값을 입력하세요 */
        /* padding: 0rem 20rem; */
        width: 100%;
        /* margin: 0rem 6.25rem; */
        /* background-color: red; */
        /* display: flex;
        justify-content: center; */
    }
`;