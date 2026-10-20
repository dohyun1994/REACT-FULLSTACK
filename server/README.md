# Server

Express와 Sequelize를 사용하는 게시글 API 서버입니다. MySQL 데이터베이스에 게시글과 댓글을 저장하고 조회합니다.

## 구현된 기능

- JSON 요청 본문을 처리하고 CORS 요청을 허용합니다.
- Sequelize로 MySQL에 연결하고 모델을 동기화한 뒤 서버를 포트 `3001`에서 시작합니다.
- 게시글 API (`/posts`)
  - `GET /posts`: 전체 게시글을 조회합니다.
  - `GET /posts/byId/:id`: ID로 게시글 하나를 조회합니다.
  - `POST /posts`: 게시글을 생성합니다.
- 댓글 API (`/comments`)
  - `GET /comments/:postId`: 특정 게시글에 연결된 댓글을 조회합니다.
  - `POST /comments`: 댓글을 생성합니다.
- `Posts`와 `Comments`는 일대다 관계이며, 댓글 모델에는 필수 `commentBody` 필드가 있습니다. Sequelize가 관계의 외래 키 `PostId`를 댓글에 추가하며, 게시글이 삭제되면 연결된 댓글도 함께 삭제되도록 설정되어 있습니다.

## 기술 스택

- Node.js (CommonJS)
- Express 5
- Sequelize 6
- MySQL (`mysql2`)
- Nodemon

## 사전 준비

- Node.js와 npm
- 실행 중인 MySQL 서버
- `config/config.json`의 설정과 일치하는 데이터베이스. 기본 개발 설정의 데이터베이스 이름은 `TutorialDB`입니다.

DB 연결 설정은 `config/config.json`에서 환경별로 관리합니다. 실행 환경에 맞게 설정하고 비밀번호 등 민감한 값은 저장소에 커밋하지 마세요.

## 실행 방법

```bash
npm install
npm start
```

서버는 Sequelize 동기화가 완료된 뒤 `http://localhost:3001`에서 요청을 받습니다.

## API 사용 예시

### 게시글 전체 조회

```http
GET http://localhost:3001/posts
```

### 게시글 하나 조회

```http
GET http://localhost:3001/posts/byId/1
```

### 게시글 생성

```http
POST http://localhost:3001/posts
Content-Type: application/json
```

요청 본문:

```json
{
  "title": "게시글 제목",
  "postText": "게시글 내용",
  "username": "작성자"
}
```

### 게시글의 댓글 조회

```http
GET http://localhost:3001/comments/1
```

경로의 `1`은 댓글을 조회할 게시글의 ID입니다.

### 댓글 생성

```http
POST http://localhost:3001/comments
Content-Type: application/json
```

요청 본문 예시:

```json
{
  "commentBody": "댓글 내용",
  "PostId": 1
}
```

`commentBody`는 필수이며, `PostId`는 댓글을 연결할 게시글의 ID입니다.

## 주요 파일

```text
config/
└── config.json             # Sequelize 환경별 MySQL 설정
models/
├── index.js                # Sequelize 초기화, 모델 로딩 및 관계 설정
├── Posts.js                # 게시글 모델과 댓글 관계
└── Comments.js             # 댓글 모델
routes/
├── Posts.js                # 게시글 조회 및 생성 API
└── Comments.js             # 댓글 조회 및 생성 API
index.js                    # Express 미들웨어, 라우터, 서버 시작
package.json                # 의존성과 실행 스크립트
```

## 테스트

현재 자동화 테스트는 구현되어 있지 않습니다. `npm test`는 테스트 미구현 안내를 출력하고 실패하도록 설정되어 있습니다.
