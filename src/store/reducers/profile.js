const initialState = {
    user: {
        userId: "",
        email: "",
        nickName: "",
        blogName: "",
        info: "",
        profileImg: "",
    },
    // userAuth 가 true이면, 게시글 및 프로필 수정, 생성 등등 권한 있음
    userAuth: false
}

const ProfileReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'PROFILE' : {
            return {
                ...state,
                user: {
                    ...state.user,
                    userId: action.data.userId,
                    email: action.data.email,
                    nickName: action.data.nickName,
                    blogName: action.data.blogName,
                    info: action.data.info,
                    profileImg: action.data.profileImg
                }
            }
        }
        case 'USER_AUTH' : {
            return {
                ...state,
                // userAuth: !state.userAuth
                userAuth: action.data.userAuth
            }
        }
        default: {
            return state;
        }
    }
}

export default ProfileReducer