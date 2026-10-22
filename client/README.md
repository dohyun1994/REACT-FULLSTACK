# Client

React 기반 게시글 클라이언트입니다. 게시글 조회·작성·댓글 기능과 회원가입·로그인 화면을 제공합니다.

## 구현된 기능

- React Router로 화면을 전환합니다.
  - `/`: 게시글 목록
  - `/createPost`: 게시글 작성
  - `/post/:id`: 게시글 상세 및 댓글
  - `/login`: 로그인
  - `/registration`: 회원가입
- 홈 화면에서 게시글 목록을 가져오고, 게시글을 선택하면 상세 화면으로 이동합니다.
- 상세 화면에서 게시글을 조회하고 댓글 목록 조회 및 댓글 작성을 할 수 있습니다.
- Formik과 Yup으로 게시글 및 회원가입 입력값을 검증하고, Axios로 서버 API를 호출합니다.
- 게시글 작성 후 홈 화면으로 이동합니다.
- 로그인 화면은 입력한 사용자 이름과 비밀번호를 서버에 전송해 결과를 표시합니다.

현재 로그인 성공 후 사용자 세션이나 토큰을 저장하는 기능은 구현되어 있지 않습니다.

## 기술 스택

- React 19
- Create React App (`react-scripts`)
- React Router DOM 5
- Axios
- Formik, Yup

## 실행 방법

먼저 [server](../server/README.md)를 실행해 API 서버와 데이터베이스를 준비합니다. 그런 다음 client 디렉터리에서 실행합니다.

```bash
npm install
npm start
```

개발 서버는 기본적으로 `http://localhost:3000`에서 실행됩니다. 클라이언트는 `http://localhost:3001`의 API 서버를 사용합니다.

## API 연동

- `GET /posts`: 게시글 목록을 조회합니다.
- `GET /posts/byId/:id`: 게시글 상세 정보를 조회합니다.
- `POST /posts`: 게시글을 생성합니다.
- `GET /comments/:postId`: 해당 게시글의 댓글을 조회합니다.
- `POST /comments`: 댓글을 생성합니다.
- `POST /auth`: 회원가입을 요청합니다.
- `POST /auth/login`: 로그인을 요청합니다.

게시글 작성 요청 예시:

```json
{
  "title": "게시글 제목",
  "postText": "게시글 내용",
  "username": "작성자"
}
```

댓글 작성 요청 예시:

```json
{
  "commentBody": "댓글 내용",
  "PostId": 1
}
```

## 주요 파일

```text
src/
├── App.js                    # 클라이언트 경로 및 공통 내비게이션
├── App.css                   # 화면과 컴포넌트 스타일
├── index.js                  # React 앱 진입점
└── pages/
    ├── Home.js               # 게시글 목록과 상세 화면 이동
    ├── CreatePost.js         # 게시글 작성 및 입력 검증
    ├── Post.js               # 게시글 상세 조회와 댓글 조회·작성
    ├── Login.js              # 로그인 요청 화면
    └── Registration.js       # 회원가입 입력 및 요청 화면
```

## 검증 및 빌드

```bash
npm test
npm run build
```
