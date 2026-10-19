# Server

Express와 Sequelize를 사용하는 게시글 API 서버입니다. MySQL 데이터베이스에 게시글을 저장하고 조회합니다.

## 구현된 기능

- JSON 요청 본문을 처리하고 CORS 요청을 허용합니다.
- Sequelize로 MySQL에 연결하고 모델 정의를 데이터베이스와 동기화한 뒤 서버를 시작합니다.
- 게시글 API를 `/posts` 경로에 제공합니다.
  - `GET /posts`: 전체 게시글을 JSON 배열로 반환합니다.
  - `POST /posts`: 요청 본문의 게시글을 저장하고 저장 요청의 데이터를 반환합니다.
- `Posts` 모델에서 `title`, `postText`, `username`을 필수로 지정합니다.

## 기술 스택

- Node.js (CommonJS)
- Express 5
- Sequelize 6
- MySQL (`mysql2`)
- Nodemon

## 사전 준비

- Node.js와 npm
- 실행 중인 MySQL 서버
- `server/config/config.json`의 설정과 일치하는 데이터베이스. 기본 개발 설정의 데이터베이스 이름은 `TutorialDB`입니다.

현재 DB 연결 설정은 `config/config.json`에서 환경별로 관리합니다. 로컬 환경에 맞게 계정 정보를 설정하세요. 비밀번호 등 비밀 정보는 저장소에 커밋하지 말고 환경변수나 별도의 안전한 설정으로 관리하세요.

## 실행 방법

```bash
npm install
npm start
```

기본적으로 `http://localhost:3001`에서 실행됩니다. Sequelize 동기화가 완료된 다음 서버가 요청을 받기 시작합니다.

## API 사용 예시

### 게시글 전체 조회

```http
GET http://localhost:3001/posts
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

세 필드는 모두 필수입니다.

## 주요 파일

```text
config/
└── config.json             # Sequelize 환경별 MySQL 설정
models/
├── index.js                # Sequelize 인스턴스 생성 및 모델 로딩
└── Posts.js                # 게시글 테이블 모델 정의
routes/
└── Posts.js                # 게시글 조회 및 생성 API
index.js                    # Express 미들웨어, 라우터, 서버 시작
package.json                # 의존성과 실행 스크립트
```

## 테스트

현재 자동화 테스트는 구현되어 있지 않습니다. `npm test`는 테스트 미구현 안내를 출력하고 실패하도록 설정되어 있습니다.
