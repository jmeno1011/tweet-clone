### 깃헙 페이지 주소

[링크](https://jmeno1011.github.io/tweet-clone/)

#### typescript 변경
- npm install typescript @types/node @types/react @types/react-dom @types/jest @types/react-router-dom
- uuid : npm i --save-dev @types/uuid 추가

#### types 구하기
- firebase user
  - accessToken : string;
  - auth : firebase.auth(); // 알아서 확인할 것
  - displayName : string; // ex: 닉네임
  - email : string; // test1@test.com
  - emailVerified : boolean; // ?? default : false
  - isAnonymous : boolean; // ?? default : false
  - metadata : UserMetadata; // 회원가입, 마지막 접속시간 등등
  - phoneNumber : number; // default : null
  - photoUrl : string; // default : null
  - uid : string; // uuid
  - reloadUserInfo : 위 정보들 summary로 있음
  .... 등등 여러가지 데이터가 있음

- userInfo
  - displayName : string; // 닉네임
  - uid: 

- tweet id : string; // uuid
  - attachmentUrl : string; // image-url
  - createAt : number; // new Date('2023-03-13).getTime();
  - creatorId : string; // uuid
  - text : string; // tweet content

#### App.tsx 
- init : program 준비 완료 확인\
  - false면 로딩 표시 , true면 라우트 보여주기

#### TweetFactory.tsx
- 트윗을 올리는 Form