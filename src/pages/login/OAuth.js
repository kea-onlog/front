// API 키는 처음에 앱 등록하면 발급받게 됨
const Rest_api_key = 'e7a85f0ab7b5326061270a166a546464';
// 인가 코드를 전달받고 넘기는 등의 작업이 이루어짐
const redirect_uri = 'http://localhost:3000/authMiddle';
// const redirect_uri = 'http://172.16.213.35:8080/auth/kakao/login';


export const Kakao_Auth_url = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
