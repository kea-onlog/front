export const profileAction = (data) => {
    return {
        type: 'PROFILE',
        data: data
    }
}

// user 권한에 해당하는지 
// ex) 프로필 수정 권한, 게시글 작성 권한
export const userAuthAction = (data) => {
    return {
        type: 'USER_AUTH',
        data: data
    }
}