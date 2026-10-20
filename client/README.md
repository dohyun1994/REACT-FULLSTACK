# Client

React 기반 게시글 클라이언트입니다. 게시글 목록을 확인하고 게시글을 작성하거나 상세 화면을 열 수 있습니다.

## 구현된 기능

- React Router로 페이지를 전환합니다.
  - `/`: 게시글 목록 화면
  - `/createPost`: 게시글 작성 화면
  - `/post/:id`: 게시글 상세 화면
- 홈 화면에서 서버의 게시글 목록을 가져오며, 게시글을 선택하면 상세 화면으로 이동합니다.
- 상세 화면은 URL의 게시글 ID로 게시글 정보를 조회합니다.
- Formik과 Yup을 사용해 게시글 작성 폼을 검증하고, Axios로 서버에 전송합니다.
- 게시글 생성 후 홈 화면으로 이동합니다.

현재 상세 화면의 댓글 영역은 안내 문구만 표시합니다. 댓글 조회·작성 API는 서버에 마련되어 있지만 클라이언트 UI에는 아직 연결되지 않았습니다.

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

- `GET /posts`: 게시글 목록을 가져옵니다.
- `GET /posts/byId/:id`: 상세 화면에 표시할 게시글을 가져옵니다.
- `POST /posts`: 새 게시글을 생성합니다.

요청 본문 예시:

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
├── App.js                  # 클라이언트 라우팅 및 공통 내비게이션
├── index.js                # React 앱 진입점
└── pages/
    ├── Home.js             # 게시글 목록 조회 및 상세 화면 이동
    ├── CreatePost.js       # 게시글 작성 및 입력값 검증
    └── Post.js             # 게시글 상세 조회 및 댓글 영역
```

## 검증 및 빌드

```bash
npm test
npm run build
```
