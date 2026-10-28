# Client

React 기반 게시판 클라이언트입니다. 게시글 조회·작성, 좋아요, 댓글 조회·작성·삭제, 회원가입과 로그인을 제공합니다.

## 구현된 기능

- React Router로 화면을 전환합니다.
  - `/`: 게시글 목록과 좋아요
  - `/createpost`: 게시글 작성
  - `/post/:id`: 게시글 상세 및 댓글
  - `/login`: 로그인
  - `/registration`: 회원가입
- 게시글 목록에서 게시글 본문을 선택하면 상세 화면으로 이동합니다.
- 로그인 성공 시 JWT를 `localStorage`의 `accessToken` 키에 저장하고 인증 사용자 정보를 `AuthContext`로 공유합니다.
- 앱 시작 시 저장된 토큰을 서버에 확인해 로그인 상태를 복원합니다. 로그인 상태에서는 사용자 이름과 로그아웃 버튼을 표시합니다.
- 좋아요 버튼으로 게시글 좋아요를 추가하거나 취소하고 화면의 개수를 갱신합니다.
- 게시글 상세에서 댓글을 조회하고, 로그인한 사용자는 댓글을 작성할 수 있습니다. 본인 이름과 일치하는 댓글에는 삭제 버튼이 표시됩니다.
- Formik과 Yup으로 게시글 및 회원가입 입력값을 검증합니다.

## 기술 스택

- React 19, Create React App (`react-scripts`)
- React Router DOM 5
- Axios
- Formik, Yup

## 실행 방법

먼저 [server](../server/README.md)를 실행하고 MySQL을 준비합니다. 그런 다음 client 디렉터리에서 실행합니다.

```bash
npm install
npm start
```

개발 서버는 기본적으로 `http://localhost:3000`에서 실행되며 API 요청은 `http://localhost:3001`로 전송됩니다.

## API 연동

모든 API는 `http://localhost:3001`을 기준으로 합니다.

| Method | 경로 | 설명 |
|---|---|---|
| `GET` | `/posts` | 게시글 목록과 좋아요 정보 조회 |
| `GET` | `/posts/byId/:id` | 게시글 상세 조회 |
| `POST` | `/posts` | 게시글 생성 |
| `GET` | `/comments/:postId` | 댓글 목록 조회 |
| `POST` | `/comments` | 댓글 생성 (`accessToken` 헤더 필요) |
| `DELETE` | `/comments/:commentId` | 댓글 삭제 (`accessToken` 헤더 필요) |
| `POST` | `/likes` | 게시글 좋아요 상태 토글 (`accessToken` 헤더 필요) |
| `POST` | `/auth` | 회원가입 |
| `POST` | `/auth/login` | 로그인 및 JWT 발급 |
| `GET` | `/auth/auth` | JWT 확인 및 사용자 정보 조회 |

로그인 성공 응답은 `{ "token": "...", "username": "...", "id": 1 }` 형식입니다. 인증 요청은 토큰을 `accessToken` 헤더에 넣습니다. 로그아웃은 서버 API가 아니라 브라우저의 토큰을 지우고 클라이언트 인증 상태를 초기화합니다.

댓글 삭제 API는 로그인 여부만 확인하며, 서버에서 요청 사용자가 댓글 작성자인지 검증하지 않습니다. 또한 댓글 생성 응답에는 DB 생성 ID가 포함되지 않고 클라이언트도 새 댓글을 목록에 추가할 때 ID를 저장하지 않으므로, 새로 작성한 댓글의 삭제 요청이 `/comments/undefined`가 될 수 있습니다.

## 주요 파일

```text
src/
├── App.js                    # 라우팅, 인증 상태 복원 및 로그아웃
├── App.css                   # 화면과 컴포넌트 스타일
├── helpers/
│   └── AuthContext.js        # 인증 상태 공유
└── pages/
    ├── Home.js               # 게시글 목록, 상세 이동, 좋아요 토글
    ├── CreatePost.js         # 게시글 작성 및 입력 검증
    ├── Post.js               # 게시글 상세, 댓글 조회·작성·삭제
    ├── Login.js              # 로그인 및 토큰 저장
    └── Registration.js       # 회원가입 입력 및 요청
```

## 검증 및 빌드

```bash
npm test
npm run build
```
