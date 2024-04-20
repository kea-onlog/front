const initialState = {
    cate: [],
    // cate: {
    //     cateId: null,
    //     name: "",
    //     order: ""
    // },
    editClick : false,
}

const CateReducer = (state = initialState, action) => {
        switch (action.type) {
            case 'CATE' : {
                return { // (뒤로가기 시 데이터 2배 되는 문제) => 카테고리 리스트 전체를 교체하는 동작을 하도록 변경
                    ...state,
                    // cate : [...state.cate, 
                        cate: action.data

                    // ]
                }

            }
            case 'ADD_CATE' : { // 전체 카테고리 리스트에 하나의 카테고리만 추가히기
                return {
                    ...state,
                    cate:[...state.cate, action.data]
                }
            }
            case 'EDIT_CLICK' : {
                return {
                    ...state,
                    editClick : action.data.editClick
                }
            }
            // case 'REMOVE_CATE' : {
            //     return {
                    
            //     }
            // }
            default:
                return state;
        }
}

export default CateReducer