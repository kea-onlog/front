import { combineReducers } from "redux";
import ProfileReducer from "./profile";
import ColorReducer from "./color";
import CardReducer from "./card";
import CateReducer from "./category";

const RootReducer = combineReducers({
    // login: LoginReducer,
    profile: ProfileReducer,
    color: ColorReducer,
    card: CardReducer,
    category: CateReducer
})

export default RootReducer