# REACT-FULLSTACK

React 클라이언트와 Express API 서버로 구성된 게시판 프로젝트입니다. 게시글과 댓글을 조회·작성하고, 회원가입과 JWT 로그인을 할 수 있습니다.

## 주요 기능

### Client

- React Router 기반 화면
  - `/`: 게시글 목록
  - `/createPost`: 게시글 작성
  - `/post/:id`: 게시글 상세 및 댓글
  - `/registration`: 회원가입
  - `/login`: 로그인
- Axios로 게시글·댓글·사용자 API와 통신합니다.
- Formik과 Yup으로 게시글 및 회원가입 입력값을 검증합니다.
- 로그인 성공 시 JWT를 브라우저 `localStorage`에 저장하고, `AuthContext`로 앱의 로그인 상태를 공유합니다.
- 앱 시작 시 저장된 JWT를 서버에 확인해 로그인 상태를 복원합니다.

### Server

- Express JSON 본문 파싱과 CORS를 설정합니다.
- Sequelize와 MySQL로 게시글, 댓글, 사용자 데이터를 관리합니다.
- 회원가입 시 bcrypt로 비밀번호를 해시하고, 로그인 성공 시 JWT를 발급합니다.
- JWT 검증 미들웨어를 사용해 댓글 작성 요청을 인증하고, 작성자 이름을 토큰의 사용자 정보에서 설정합니다.
- 게시글과 댓글은 일대다 관계이며, 게시글 삭제 시 관련 댓글도 삭제되도록 설정되어 있습니다.

## 기술 스택

- **Client:** React 19, Create React App, React Router DOM 5, Axios, Formik, Yup
- **Server:** Node.js, Express 5, Sequelize 6, MySQL (`mysql2`), bcrypt, jsonwebtoken

## 사전 준비 및 설정

- Node.js와 npm
- 실행 가능한 MySQL 서버
- 기본 개발 설정의 `TutorialDB` 데이터베이스

DB 연결 설정은 [server/config/config.json](server/config/config.json)에 있습니다. 실행 환경에 맞는 계정과 데이터베이스 정보를 설정하세요.

현재 JWT 서명 키는 서버 코드에 직접 입력되어 있습니다. 배포 전에 환경변수 등 안전한 비밀 관리 방식으로 옮기고, DB 비밀번호와 같은 민감한 값은 저장소에 커밋하지 마세요.

## 실행 방법

서버와 클라이언트를 각각 별도의 터미널에서 실행합니다.

### API 서버

```bash
cd server
npm install
npm start
```

DB 모델 동기화가 완료되면 API 서버가 `http://localhost:3001`에서 실행됩니다.

### React 클라이언트

```bash
cd client
npm install
npm start
```

개발 서버는 기본적으로 `http://localhost:3000`에서 실행되며 API 요청은 `http://localhost:3001`로 전송됩니다.

## API

모든 경로는 `http://localhost:3001`을 기준으로 합니다.

### 게시글

| Method | 경로 | 설명 |
|---|---|---|
| `GET` | `/posts` | 게시글 전체 조회 |
| `GET` | `/posts/byId/:id` | ID로 게시글 조회 |
| `POST` | `/posts` | 게시글 생성 |

게시글 생성 본문:

```json
{
  "title": "게시글 제목",
  "postText": "게시글 내용",
  "username": "작성자"
}
```

`title`, `postText`, `username`은 필수입니다. 현재 게시글 생성 API에는 인증 미들웨어가 적용되어 있지 않습니다.

### 댓글

| Method | 경로 | 설명 |
|---|---|---|
| `GET` | `/comments/:postId` | 게시글 댓글 조회 |
| `POST` | `/comments` | 인증된 사용자로 댓글 생성 |

댓글 생성 요청은 `accessToken` 헤더와 다음 JSON 본문을 사용합니다.

```json
{
  "commentBody": "댓글 내용",
  "PostId": 1
}
```

작성자 이름은 요청 본문이 아니라 검증된 JWT의 사용자 정보에서 설정됩니다.

### 사용자 인증

| Method | 경로 | 설명 |
|---|---|---|
| `POST` | `/auth` | 회원가입 |
| `POST` | `/auth/login` | 로그인 및 JWT 발급 |
| `GET` | `/auth/auth` | JWT 확인 및 토큰 사용자 정보 반환 |

회원가입 및 로그인 요청 본문:

```json
{
  "username": "사용자 이름",
  "password": "비밀번호"
}
```

로그인 성공 시 응답으로 JWT 문자열을 반환합니다. 인증이 필요한 요청에는 이 값을 `accessToken` 헤더로 전달합니다. 현재 댓글 작성에만 JWT 검증이 적용되어 있습니다. 게시글 작성 권한이나 로그아웃/토큰 폐기 기능은 구현되어 있지 않습니다.

## 프로젝트 구조

```text
.
├── .gitignore
├── client/
│   ├── public/
│   └── src/
│       ├── helpers/
│       │   └── AuthContext.js
│       ├── pages/
│       │   ├── Home.js
│       │   ├── CreatePost.js
│       │   ├── Post.js
│       │   ├── Login.js
│       │   └── Registration.js
│       ├── App.js
│       └── App.css
└── server/
    ├── config/
    │   └── config.json
    ├── middlewares/
    │   └── AuthMiddleware.js
    ├── models/
    │   ├── Posts.js
    │   ├── Comments.js
    │   ├── Users.js
    │   └── index.js
    ├── routes/
    │   ├── Posts.js
    │   ├── Comments.js
    │   └── Users.js
    └── index.js
```

저장소 루트의 `.gitignore`는 client/server 하위의 `node_modules` 설치 폴더를 Git에서 제외합니다. 의존성 재설치는 각 폴더의 `package.json`과 lock 파일을 사용합니다.

## 테스트 및 빌드

Client 프로덕션 빌드:

```bash
cd client
npm run build
```

Client 테스트:

```bash
cd client
npm test
```

Server 테스트는 아직 구현되지 않았으며, 현재 `server/package.json`의 `test` 스크립트는 미구현 안내 후 실패하도록 설정되어 있습니다.
