# Client

React 기반 게시글 클라이언트입니다. 게시글 목록을 조회하고 새 게시글을 작성할 수 있습니다.

## 구현된 기능

- React Router를 이용한 페이지 이동
  - `/`: 게시글 목록 화면
  - `/createPost`: 게시글 작성 화면
- Axios로 서버 API에 게시글 목록을 요청하고 새 게시글을 전송합니다.
- Formik과 Yup으로 게시글 작성 폼 상태와 입력값을 검증합니다.
- 게시글 작성 성공 후 홈 화면으로 이동합니다.

## 기술 스택

- React 19
- Create React App (`react-scripts`)
- React Router DOM 5
- Axios
- Formik, Yup

## 실행 방법

먼저 [server](../server/README.md)를 실행해 API 서버와 데이터베이스를 준비합니다. 그 다음 client 디렉터리에서 실행합니다.

```bash
npm install
npm start
```

개발 서버는 기본적으로 `http://localhost:3000`에서 실행됩니다. 클라이언트는 `http://localhost:3001/posts` API를 사용하므로 서버가 해당 주소에서 실행 중이어야 합니다.

## 게시글 API 연동

- `GET http://localhost:3001/posts`: 홈 화면에서 게시글 목록을 가져옵니다.
- `POST http://localhost:3001/posts`: 작성 폼에서 아래 필드를 JSON으로 전송합니다.

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
    ├── Home.js             # 게시글 목록 조회 및 표시
    └── CreatePost.js       # 게시글 작성 및 입력값 검증
```

## 검증 및 빌드

```bash
npm test
npm run build
```
