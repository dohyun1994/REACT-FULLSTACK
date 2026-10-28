# REACT-FULLSTACK

React 클라이언트와 Express API 서버로 구성된 게시판 프로젝트입니다. 게시글·댓글·좋아요 기능과 JWT 기반 회원가입 및 로그인을 제공합니다.

## 주요 기능

### Client

- React Router 화면: 게시글 목록(`/`), 게시글 작성(`/createpost`), 게시글 상세(`/post/:id`), 로그인(`/login`), 회원가입(`/registration`)
- 게시글과 댓글 조회 및 게시글 좋아요 토글
- 게시글 및 회원가입 폼 입력 검증(Formik, Yup)
- 로그인 성공 시 JWT를 `localStorage`에 저장하고, 앱 시작 시 서버에서 검증해 로그인 상태 복원
- 로그아웃 시 로컬 토큰과 클라이언트 인증 상태 초기화
- 댓글 작성 및 본인 이름과 일치하는 댓글의 삭제 버튼 제공

### Server

- Express JSON 요청 처리, CORS, Sequelize와 MySQL 연동
- 게시글·댓글·사용자·좋아요 모델
- bcrypt로 비밀번호 해시, jsonwebtoken을 통한 로그인 및 토큰 검증
- 댓글 생성과 좋아요 변경에 JWT 인증 적용
- 게시글 목록 응답에 좋아요 정보 포함

## 기술 스택

- **Client:** React 19, Create React App, React Router DOM 5, Axios, Formik, Yup
- **Server:** Node.js, Express 5, Sequelize 6, MySQL (`mysql2`), bcrypt, jsonwebtoken

## 사전 준비와 보안 설정

- Node.js와 npm
- 실행 가능한 MySQL 서버 및 개발 데이터베이스 `TutorialDB`

DB 접속 설정은 [server/config/config.json](server/config/config.json)에 있습니다. 현재 JWT 비밀 키 `importantsecret`은 코드에 직접 입력되어 있습니다. 공개 또는 배포하기 전에 DB 비밀번호와 JWT 키를 환경변수 또는 비밀 관리 서비스로 옮기세요.

## 실행 방법

서버와 클라이언트를 각각 별도의 터미널에서 시작합니다.

### Server

```bash
cd server
npm install
npm start
```

서버는 모델 동기화 후 `http://localhost:3001`에서 시작합니다.

### Client

```bash
cd client
npm install
npm start
```

클라이언트는 `http://localhost:3000`에서 시작하며 API 서버는 `http://localhost:3001`을 사용합니다.

## API 개요

모든 경로는 `http://localhost:3001`을 기준으로 합니다.

| Method | 경로 | 설명 | 인증 |
|---|---|---|---|
| `GET` | `/posts` | 게시글 및 좋아요 정보 조회 | 아니요 |
| `GET` | `/posts/byId/:id` | 게시글 상세 조회 | 아니요 |
| `POST` | `/posts` | 게시글 생성 | 아니요 |
| `GET` | `/comments/:postId` | 댓글 목록 조회 | 아니요 |
| `POST` | `/comments` | 댓글 생성 | `accessToken` |
| `DELETE` | `/comments/:commentId` | 댓글 삭제 | `accessToken` |
| `POST` | `/likes` | 게시글 좋아요 추가/취소 토글 | `accessToken` |
| `POST` | `/auth` | 회원가입 | 아니요 |
| `POST` | `/auth/login` | 로그인 및 JWT 발급 | 아니요 |
| `GET` | `/auth/auth` | JWT 검증 및 사용자 정보 조회 | `accessToken` |

인증 요청에는 다음 헤더를 전달합니다.

```http
accessToken: <JWT>
```

좋아요 요청 본문:

```json
{
  "PostId": 1
}
```

현재 댓글 삭제 API는 로그인한 사용자만 확인하며 댓글 소유권을 검증하지 않습니다. 게시글 생성도 인증이 적용되지 않았습니다. 또한 댓글 생성 API 응답에 DB 생성 ID가 포함되지 않고 클라이언트의 새 댓글 상태에도 ID가 없으므로, 방금 작성한 댓글의 삭제 요청에서 `undefined` ID가 전송될 수 있습니다.

## 디렉터리 구조

```text
.
├── .gitignore                 # 하위 폴더의 node_modules 제외
├── client/
│   └── src/
│       ├── helpers/AuthContext.js
│       ├── pages/
│       │   ├── Home.js
│       │   ├── CreatePost.js
│       │   ├── Post.js
│       │   ├── Login.js
│       │   └── Registration.js
│       ├── App.js
│       └── App.css
└── server/
    ├── config/config.json
    ├── middlewares/AuthMiddleware.js
    ├── models/
    │   ├── Posts.js
    │   ├── Comments.js
    │   ├── Likes.js
    │   ├── Users.js
    │   └── index.js
    ├── routes/
    │   ├── Posts.js
    │   ├── Comments.js
    │   ├── Likes.js
    │   └── Users.js
    └── index.js
```

## 테스트 및 빌드

Client:

```bash
cd client
npm test
npm run build
```

Server 테스트는 아직 구현되지 않았습니다. 현재 `server/package.json`의 테스트 스크립트는 미구현 안내 후 실패하도록 설정되어 있습니다.
