const initialState = {
    category: "",
    color: "--black",
}

const ColorReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'COLOR' : {
            return {
                ...state,
                category: action.data.category,
                color: action.data.color,
            }
        }
        default: {
            return state;
        }
    }
}

export default ColorReducer