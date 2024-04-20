import styled from "styled-components";
import Card from "../home/Card";
import { SBold192, SRegular208 } from "../../components/style/Styled";
import {ReactComponent as Edit} from "../../assets/images/Icons/Edit.svg";
import {ReactComponent as Lock} from "../../assets/images/Icons/Lock.svg";
import {ReactComponent as Plus} from "../../assets/images/Icons/Plus.svg";
import { useEffect, useState } from "react";
import { Get_Categori } from "../../apis/API_MyPage";
import CategoryItem from "./CategoryItem";
import { useDispatch, useSelector } from "react-redux";
import { cateAction, editClickAction } from "../../store/actions/category";
import { filterListAction } from "../../store/actions/card";
import AddCategoryItem from "./AddCategoryItem";
import { useLocation, useParams } from "react-router-dom";

const MypagePost = () => {
    // url에서 userId 가져오기 -> 이걸 api에 params로 넣어주기!
    let params = useParams().userId;
    if (params === undefined) {
        params = window.localStorage.getItem("userId");
    }
    // auth 여부 확인
    const userAuth = useSelector(state => state.profile.userAuth);


    const [EditClickCheck, setEditClickCheck] = useState(false);
    const [AddClickCheck, setAddClickCheck] = useState(0);
    const dispatch = useDispatch();
    const cateList = useSelector(state => state.category.cate);
    const location = useLocation();

    useEffect(() => {

        Get_Categori(params)
        .then((data) => {
            if (data.success === false) {
                throw new Error(data.message); // 에러 발생
            }

            //카테고리 order 오름차순으로 저장
            let sortedData = data.data.sort((a, b) => a.order - b.order);
            // console.log("sortedData",sortedData);

            // 스토어-카테고리리스트 add  
            // sortedData.forEach((item) => {
            //     dispatch(cateAction(item));ㅊ
            //   });
            dispatch(cateAction(sortedData));

            // 스토어-필터링조건
            dispatch(
                filterListAction({
                    blog_id: params,
                    category_id: data.data.id
                })
            );
        })
        .catch((error) => {
            console.log(error);
        })
    },[params, dispatch, location.key]);

    const handleEdit = () => {
        setEditClickCheck(!EditClickCheck);

        dispatch(
            editClickAction({
                editClick : !EditClickCheck,
            })
        );
        console.log("확인", !EditClickCheck);
    };

    const handleClick = (cateId=null) => { // 함수 호출 시 인자가 전달되지 않은 경우 대비 위해
        console.log("click"); 
        dispatch(
            filterListAction({
                blog_id: params,
                category_id: cateId
            })
        )
    }

    return(
            <PageWrap>
                {/* {EditClickCheck && <CategoryEdit/>} */}
                <StickWrap>
                    <CateWrap $isExpanded={EditClickCheck}>
                        <MenuWrap>
                            <SRegular208>Category</SRegular208>
                            {userAuth && (
                                <EditBtn onClick={handleEdit}><Edit/></EditBtn>
                            )}
                        </MenuWrap>

                        {!EditClickCheck && (
                            <>
                                <Option onClick={() => handleClick()}>
                                    <CateTitle>전체</CateTitle>
                                </Option>
                                {userAuth && (
                                    <Option>
                                        <Lock/>
                                        <CateTitle>비공개 글</CateTitle>
                                    </Option>
                                )}
                            </>
                        )}


                        {cateList.map((item) => (
                            <CategoryItem key={item.id} item={item} handleClick={handleClick}/>
                        ))}


                        {EditClickCheck && (
                            <>
                                {Array.from({ length: AddClickCheck }).map((_, index) => (
                                    <AddCategoryItem key={index} />
                                ))}

                                <AddBtn onClick={() => setAddClickCheck(AddClickCheck+1)}>
                                    <Plus/>
                                    <CateTitle>카테고리 추가</CateTitle>
                                </AddBtn>
                            </>
                        )}

                    </CateWrap>
                </StickWrap>
                
                {!EditClickCheck  && (
                    <>
                        {cateList.length > 0 && 
                            <PostWrap>
                                <Card/>
                            </PostWrap>
                        }
                    </>
                )}

            </PageWrap>
    );
};

export default MypagePost;

const PageWrap = styled.div`
    display: flex;
    position: relative;
`
const StickWrap = styled.div`
`;

const CateWrap = styled.div`
    position: sticky;
    top: 0;
    display: flex;
    /* width: 29.8125rem; */
    width: ${props => props.$isExpanded ? 'calc(100vw - 12.5rem)' : '29.8125rem'};
    transition: width 0.5s ease-out;
    // padding: 1.625rem 0rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
    /* border-right: 1px solid var(--gray_bold, #4A4A4A); */
    /* background: #FFF; */
`
const MenuWrap = styled.div`
    align-self: stretch;

    display: flex;
    justify-content: space-between;
    align-items: center;

    /* gap: 2.5rem; */
    padding: 1.62rem 1.25rem 1.25rem 1.25rem;
`;
const EditBtn = styled.button`
  background-color: transparent;
  border:none;
  outline:none;
  cursor:pointer;
    svg {
        pointer-events:auto; // SVG 내부의 그래픽 요소에만 마우스 이벤트 적용
    }
`;
const Option = styled.button`
    cursor: pointer;
    border: none;
    background: var(--gray_lighter, #DCDCDC);

    display: flex;
    gap: 0.625rem;
    padding: 1.5rem 1.25rem 1.5rem 2.5rem;
    align-self: stretch;
`;
const AddBtn = styled(Option)`
    /* justify-content: space-between; */
    align-items: center;

`;
// const Category = styled.button`
//     cursor: ${props => !props.$isButton ? "pointer" : "default"};
//     display: flex;
//     padding: 1.5rem 1.25rem 1.5rem 2.5rem;
//     justify-content: space-between;
//     /* align-items: flex-start; */
//     align-content: center;
//     align-self: stretch;

//     border: 1px solid var(--gray_light, #939393);
//     background: #FFF;
// `
const CateTitle = styled(SBold192)`
    color: var(--black);
    align-self: stretch;
    display: flex;
    align-items: center;
`
const PostWrap = styled.div`
    width: 90rem;
    border-left: 1px solid var(--gray_bold, #4A4A4A);
    
`
// const UserOption = styled.div`
//     display: flex;
//     justify-content: center;
//     gap: 1rem;
// `;
// const UserOptionBtn = styled(XSSemibold16).attrs({as:'button'})`
//     display: flex;
//     align-items: center;
//     padding: 0.75rem 1rem;
//     border: none;
//     background-color: var(--white);
//     position: relative;
//     cursor: pointer;
//     gap: 0.5rem;

//     &::after {
//         content: "";
//         /* border: 0cap.5 solid black; */
//         width: 0.0625rem;
//         height: 1.875rem;
//         background: linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #000;
//         height: 23px;
//         position: absolute;
//         right: -10px;  // Adjust this value to position "sss" correctly
//     }

//     &:last-child::after {
//         display: none;
//     }
    
// `;


