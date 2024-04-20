// const initialState = {
//     user: {
//         userId: "",
//         email: "",
//     },

//     token: {
//         accessToken: localStorage.getItem('accessToken') || null,
//         refreshToken: localStorage.getItem('refreshToken') || null
//     }
// }

// const LoginReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case 'LOGIN' : {
//             return {
//                 ...state,
//                 user: {
//                     ...state.user,
//                     // jwt: action.data.jwt,
//                     userId: action.data.userId,
//                     email: action.data.email
//                 }
//             }
//         }

//         case 'SET_TOKEN' : {
//             return {
//                 ...state,
//                 token: {
//                     ...state.token,
//                     accessToken: action.data.accessToken,
//                     refreshToken: action.data.refreshToken
//                 }
//             }
//         }

//         default: {
//             return state;
//         }
//     }

// }

// export default LoginReducer