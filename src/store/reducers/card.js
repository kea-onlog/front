const initialState = {
    filterList: {
        topic: "",
        hashtag: "",
        blog_id: "",
        category_id: null,
        // is_public: "",
    },
}

const CardReducer = (state = initialState, action) => {
        switch (action.type) {
            case 'FILTER_LIST' : {
                return {
                    ...state,
                    filterList: {
                        // ...state.filterList,
                        topic: action.data.topic,
                        hashtag: action.data.hashtag,
                        blog_id: action.data.blog_id,
                        category_id: action.data.category_id,
                    }
                }
            }
            default: {
                return state;
            }
        }
}
export default CardReducer