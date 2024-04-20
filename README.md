# ☀ OnLog_Front
이 저장소는 블로그 서비스 'OnLog'의 프론트 작업 공간입니다.

## 🌐 프로젝트 개요
Onlog 블로그 프로젝트는 사용자 중심의 디자인과 기능을 제공하는 블로그 서비스를 개발하는 프로젝트입니다. 사용자의 편의성을 극대화하고 소통의 효율성을 높이는 것을 목표로, 사용자 친화적인 인터페이스, AI 기반의 텍스트 요약 및 이미지 생성으로 썸네일 제작 기능, Elastic Search를 통한 검색 엔진 구현 등을 통해 이 목표를 실현하였습니다.   
<p align="center"><img src="https://github.com/KEAPoint/OnLog-k8s/assets/51251702/276e7783-6cbe-4d95-a8df-6281c7f5a609" height="80%" width="80%"></p>

## 🎬 시연 영상
> **video url** : https://youtu.be/SzxRC9CdbTo

## 🛠️ 프로젝트 개발 환경
> OS: macOS   
IDE: Visual Studio   
Frontend : React   
Backend : Spring boot   
검색 엔진 : Elastic Search   
사용된 AI 기술 : CLOVA, Karlo    

## 🔗 프로젝트 구조

```text
├── components
    │   ├── common
    │   │   ├── BackImage.js
    │   │   ├── BlogItem.js
    │   │   ├── Footer.js
    │   │   ├── Header.js
    │   │   ├── HeaderLogoOnly.js
    │   │   ├── HeaderNormal.js
    │   │   ├── InfiniteScroll.js
    │   │   ├── MediaQuery.js
    │   │   ├── NoticeItem.js
    │   │   ├── ScrollTop.js
    │   │   ├── UserProfile.js
    │   │   └── theme.js
    │   └── style
    │       ├── AniStyled.js
    │       ├── GlobalStyled.js
    │       ├── Styled.js
    │       └── font.css
    ├── index.js
    ├── pages
    │   ├── PostWrite
    │   │   ├── CreateAI.js
    │   │   ├── Index.js
    │   │   └── PostNew.js
    │   ├── home
    │   │   ├── Card.js
    │   │   ├── CardItem.js
    │   │   ├── CardItemHover.js
    │   │   ├── Index.js
    │   │   └── SkeletonItem.js
    │   ├── landing
    │   │   ├── Index.js
    │   │   └── LandItem.js
    │   ├── login
    │   │   ├── Index.js
    │   │   ├── KakaoLogin.js
    │   │   ├── KakaoMiddle.js
    │   │   ├── Login.css
    │   │   ├── OAuth.js
    │   │   └── SignUp.js
    │   ├── myPage
    │   │   ├── AddCategoryItem.js
    │   │   ├── CategoryItem.js
    │   │   ├── Index.js
    │   │   ├── MyPagePost.js
    │   │   ├── MypageTop.js
    │   │   ├── SideBar.js
    │   │   └── SubscribeCheck.js
    │   ├── notification
    │   │   └── Index.js
    │   ├── postView
    │   │   ├── Comment.js
    │   │   ├── CommentWrite.js
    │   │   ├── Index.js
    │   │   ├── PostComment.js
    │   │   ├── PostHeader.js
    │   │   ├── PostText.js
    │   │   ├── PostThumb.js
    │   │   └── ReplyComment.js
    │   ├── profileEdit
    │   │   └── Index.js
    │   ├── search
    │   │   ├── BlogSearch.js
    │   │   ├── Index.js
    │   │   ├── PostSearch.js
    │   │   └── SearchBox.js
    │   └── subscribe
    │       ├── Index.js
    │       ├── NewSubsPost.js
    │       └── SubsBlog.js
    ├── setupProxy.js
    ├── setupTest.js
    └── store
        ├── actions
        │   ├── card.js
        │   ├── category.js
        │   ├── color.js
        │   ├── login.js
        │   └── profile.js
        └── reducers
            ├── Index.js
            ├── card.js
            ├── category.js
            ├── color.js
            ├── login.js
            └── profile.js
```

## ✅ 프로젝트 개발/실행

1. 레포지토리 클론
```commandline
git clone https://github.com/yourusername/onlog.git
```

2. 필요한 패키지 설치
```commandline
npm install
```

3. 프로젝트 실행
```commandline
npm start
```

**참고) main 브랜치로 진행해 주세요.**

