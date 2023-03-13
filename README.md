### 깃헙 페이지 주소

[링크](https://jmeno1011.github.io/tweet-clone/)

#### typescript 변경
- npm install typescript @types/node @types/react @types/react-dom @types/jest @types/react-router-dom
- uuid : npm i --save-dev @types/uuid 추가

#### types 구하기
- tweet id : string; // uuid
  - attachmentUrl : string; // image-url
  - createAt : number; // new Date('2023-03-13).getTime();
  - creatorId : string; // uuid
  - text : string; // tweet content