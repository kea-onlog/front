export const cateAction = (data) => { // 서버로부터 전체
    return {
        type: 'CATE',
        data: data
    }
}
export const cateAddAction = (data) => {
    return {
        type: 'ADD_CATE',
        data: data
    }
}
// export const cateRemoveAction = (data) => {
//     return {
//         type: 'REMOVE_CATE',
//         data: data
//     }
// }
export const editClickAction = (data) => {
    return {
        type: 'EDIT_CLICK',
        data: data
    }
}