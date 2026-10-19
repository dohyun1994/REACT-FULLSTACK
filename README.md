# REACT-FULLSTACK

React 클라이언트와 Express 서버로 구성할 예정인 프로젝트입니다. 현재는 Express 서버, MySQL/Sequelize 연결, 게시글 모델 및 게시글 조회·생성 API가 구현되어 있습니다.

## 현재 구현된 내용

- Express 앱에서 JSON 요청 본문을 파싱합니다.
- Sequelize로 MySQL에 연결하고 데이터베이스 동기화가 완료되면 서버가 포트 `3001`에서 시작됩니다.
- `/posts` 경로에 게시글 라우터를 등록했습니다.
  - `GET /posts`: 모든 게시글을 조회합니다.
  - `POST /posts`: 요청 본문의 게시글을 데이터베이스에 저장합니다.
- `Posts` 모델에 다음 필드가 정의되어 있습니다.
  - `title`: 제목 (필수)
  - `postText`: 게시글 내용 (필수)
  - `username`: 작성자 이름 (필수)
  - Sequelize 기본 `id`, `createdAt`, `updatedAt` 필드
- 모델은 `server/models` 디렉터리에서 자동으로 로드됩니다.

## 기술 스택

- Node.js
- Express 5
- Sequelize 6
- MySQL (`mysql2`)
- Nodemon

## 실행 방법

### 사전 준비

- Node.js와 npm
- 로컬 MySQL 서버
- `TutorialDB` 데이터베이스

### 서버 실행

```bash
cd server
npm install
npm start
```

서버가 정상적으로 시작되면 콘솔에 `Server is running on port 3001`이 출력됩니다.

## 게시글 API

서버 실행 후 `http://localhost:3001`을 기준으로 아래 API를 사용할 수 있습니다.

### 게시글 전체 조회

```http
GET /posts
```

저장된 게시글 목록을 JSON 배열로 반환합니다.

### 게시글 생성

```http
POST /posts
Content-Type: application/json
```

요청 본문 예시:

```json
{
  "title": "첫 게시글",
  "postText": "게시글 내용입니다.",
  "username": "작성자"
}
```

`title`, `postText`, `username`은 모두 필수입니다.

### 데이터베이스 설정

연결 설정은 `server/config/config.json`에 있으며 기본 환경은 `development`입니다. 현재 설정은 로컬 MySQL의 `TutorialDB` 데이터베이스를 사용합니다. 실행 전에 해당 설정을 본인의 MySQL 환경에 맞게 변경하고, 운영 환경의 비밀번호와 같은 민감한 값은 소스 코드에 직접 저장하지 마세요.

## 디렉터리 구조

```text
.
├── client/                 # 현재 비어 있음
└── server/
    ├── config/
    │   └── config.json     # Sequelize 환경별 MySQL 설정
    ├── models/
    │   ├── index.js        # Sequelize 초기화 및 모델 로드
    │   └── Posts.js        # 게시글 모델
    ├── routes/
    │   └── Posts.js        # 게시글 조회·생성 API
    ├── index.js            # Express 서버 진입점
    └── package.json        # 서버 의존성과 실행 스크립트
```

## 테스트

현재 테스트는 작성되어 있지 않습니다. `server/package.json`의 `test` 스크립트는 테스트 미구현 안내 후 실패하도록 설정되어 있습니다.
