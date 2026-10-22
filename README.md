# REACT-FULLSTACK

React 클라이언트와 Express API 서버로 구성된 게시판 프로젝트입니다. 게시글 작성·조회, 댓글 작성·조회, 회원가입과 로그인 기능을 제공합니다.

## 구현된 기능

### Client

- React Router를 통한 화면 이동
  - `/`: 게시글 목록
  - `/createPost`: 게시글 작성
  - `/post/:id`: 게시글 상세 및 댓글
  - `/registration`: 회원가입
  - `/login`: 로그인
- Axios를 사용해 게시글, 댓글, 사용자 API를 호출합니다.
- Formik과 Yup으로 게시글 및 회원가입 폼 입력값을 검증합니다.

### Server

- Express JSON 요청 본문 파싱과 CORS 미들웨어를 제공합니다.
- Sequelize와 MySQL을 사용해 게시글, 댓글, 사용자 모델을 관리합니다.
- 게시글과 댓글 사이에 일대다 관계를 설정했습니다. 게시글 삭제 시 연결된 댓글도 삭제됩니다.
- 회원가입 시 bcrypt로 비밀번호를 해시해 저장하고, 로그인 시 입력한 비밀번호를 해시와 비교합니다.

로그인 API는 현재 로그인 결과만 반환합니다. 세션·토큰 발급 및 인증이 필요한 API에 대한 권한 검사는 아직 구현되어 있지 않습니다.

## 기술 스택

- **Client:** React 19, Create React App, React Router DOM 5, Axios, Formik, Yup
- **Server:** Node.js, Express 5, Sequelize 6, MySQL (`mysql2`), bcrypt

## 사전 준비

- Node.js와 npm
- 로컬 또는 접근 가능한 MySQL 서버
- 개발 설정에 지정된 `TutorialDB` 데이터베이스

DB 연결 정보는 `server/config/config.json`에서 관리합니다. 실행 환경에 맞게 설정을 확인하세요. 비밀번호 등 민감한 정보는 저장소에 커밋하지 마세요.

## 실행 방법

터미널을 두 개 열어 서버와 클라이언트를 각각 실행합니다.

### 1. API 서버

```bash
cd server
npm install
npm start
```

서버는 DB 모델 동기화 후 `http://localhost:3001`에서 실행됩니다.

### 2. React 클라이언트

```bash
cd client
npm install
npm start
```

클라이언트 개발 서버는 기본적으로 `http://localhost:3000`에서 실행되며, API 요청은 `http://localhost:3001`로 전송됩니다.

## API

### 게시글

| Method | 경로 | 설명 |
|---|---|---|
| `GET` | `/posts` | 게시글 전체 조회 |
| `GET` | `/posts/byId/:id` | ID로 게시글 조회 |
| `POST` | `/posts` | 게시글 생성 |

게시글 생성 JSON:

```json
{
  "title": "게시글 제목",
  "postText": "게시글 내용",
  "username": "작성자"
}
```

`title`, `postText`, `username`은 필수 필드입니다.

### 댓글

| Method | 경로 | 설명 |
|---|---|---|
| `GET` | `/comments/:postId` | 게시글에 연결된 댓글 조회 |
| `POST` | `/comments` | 댓글 생성 |

댓글 생성 JSON:

```json
{
  "commentBody": "댓글 내용",
  "PostId": 1
}
```

### 사용자

| Method | 경로 | 설명 |
|---|---|---|
| `POST` | `/auth` | 사용자 계정 생성 |
| `POST` | `/auth/login` | 사용자 이름과 비밀번호 확인 |

회원가입 및 로그인 요청 JSON:

```json
{
  "username": "사용자 이름",
  "password": "비밀번호"
}
```

## 프로젝트 구조

```text
.
├── client/
│   ├── public/
│   └── src/
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

## 테스트 및 빌드

Client 빌드:

```bash
cd client
npm run build
```

Client 테스트:

```bash
cd client
npm test
```

Server에는 아직 자동화 테스트가 없습니다. 현재 `server/package.json`의 `test` 스크립트는 미구현 안내 후 실패하도록 설정되어 있습니다.
