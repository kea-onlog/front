const accessToken = window.localStorage.getItem("accessToken");

export const AutoLogin = async () => {
    const url = '';

    const res = await axios({
        method: "post",
        url: url,
        headers: {
            'Authorization': accessToken
          }
    });
    // console.log('Home자동로그인jwt:',localData);
    // console.log('Home자동로그인:',res.data);

    return res.data.isSuccess;
}