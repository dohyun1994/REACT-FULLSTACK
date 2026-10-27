# Client

React 기반 게시판 클라이언트입니다. 게시글 조회·작성, 댓글 조회·작성, 회원가입과 JWT 로그인 기능을 제공합니다.

## 구현된 기능

- React Router로 화면을 전환합니다.
  - `/`: 게시글 목록
  - `/createPost`: 게시글 작성
  - `/post/:id`: 게시글 상세 및 댓글
  - `/login`: 로그인
  - `/registration`: 회원가입
- 게시글 목록에서 항목을 선택하면 해당 게시글 상세 화면으로 이동합니다.
- 상세 화면에서 게시글과 댓글을 조회하며, 로그인 토큰을 포함해 댓글을 작성합니다.
- Formik과 Yup으로 게시글 및 회원가입 입력값을 검증합니다.
- 로그인 성공 시 JWT를 `localStorage`의 `accessToken` 키에 저장하고, 인증 상태를 Context로 공유합니다.
- 앱 시작 시 저장된 토큰을 서버에 확인해 로그인 상태를 복원합니다.
- 로그인하지 않은 상태에서는 내비게이션의 로그인·회원가입 링크를 표시합니다.

## 기술 스택

- React 19, Create React App (`react-scripts`)
- React Router DOM 5
- Axios
- Formik, Yup

## 실행 방법

먼저 [server](../server/README.md)를 실행해 API 서버와 데이터베이스를 준비합니다. 그런 다음 client 디렉터리에서 실행합니다.

```bash
npm install
npm start
```

개발 서버는 기본적으로 `http://localhost:3000`에서 실행됩니다. API 요청은 `http://localhost:3001`로 전송됩니다.

## API 연동

| Method | 경로 | 설명 |
|---|---|---|
| `GET` | `/posts` | 게시글 목록 조회 |
| `GET` | `/posts/byId/:id` | 게시글 상세 조회 |
| `POST` | `/posts` | 게시글 생성 |
| `GET` | `/comments/:postId` | 댓글 목록 조회 |
| `POST` | `/comments` | 댓글 생성 (요청 헤더에 `accessToken` 필요) |
| `POST` | `/auth` | 회원가입 |
| `POST` | `/auth/login` | 로그인 및 JWT 발급 |
| `GET` | `/auth/auth` | JWT 확인 및 로그인 사용자 정보 조회 |

댓글 작성 요청에는 `accessToken` 헤더로 로그인 토큰을 보냅니다. 토큰은 현재 브라우저의 `localStorage`에 저장됩니다.

게시글 생성 본문 예시:

```json
{
  "title": "게시글 제목",
  "postText": "게시글 내용",
  "username": "작성자"
}
```

## 주요 파일

```text
src/
├── App.js                    # 라우팅, 인증 상태 복원 및 Context 제공
├── App.css                   # 화면과 컴포넌트 스타일
├── helpers/
│   └── AuthContext.js        # 로그인 상태 공유를 위한 Context
├── index.js                  # React 앱 진입점
└── pages/
    ├── Home.js               # 게시글 목록과 상세 화면 이동
    ├── CreatePost.js         # 게시글 작성 및 입력 검증
    ├── Post.js               # 게시글 상세와 댓글 조회·작성
    ├── Login.js              # 로그인 및 토큰 저장
    └── Registration.js       # 회원가입 입력 및 요청
```

## 검증 및 빌드

```bash
npm test
npm run build
```
