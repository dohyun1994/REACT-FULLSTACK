# Server

Express와 Sequelize 기반 API 서버입니다. MySQL에 게시글, 댓글, 사용자, 좋아요 정보를 저장하고 JWT를 이용해 일부 요청을 인증합니다.

## 구현된 기능

- Express JSON 본문 파싱과 CORS 설정
- Sequelize를 통한 MySQL 연결 및 모델 동기화
- 게시글 API (`/posts`)
  - `GET /posts`: 게시글과 좋아요 정보를 포함해 조회
  - `GET /posts/byId/:id`: ID로 게시글 조회
  - `POST /posts`: 게시글 생성
- 댓글 API (`/comments`)
  - `GET /comments/:postId`: 특정 게시글의 댓글 조회
  - `POST /comments`: JWT 검증 후 댓글 생성. 댓글 작성자 이름은 인증된 사용자에서 설정
  - `DELETE /comments/:commentId`: JWT 검증 후 댓글 삭제
- 좋아요 API (`/likes`)
  - `POST /likes`: 인증된 사용자의 게시글 좋아요를 추가하거나 취소
- 사용자 API (`/auth`)
  - `POST /auth`: bcrypt로 비밀번호를 해시해 사용자 계정 생성
  - `POST /auth/login`: 비밀번호 확인 후 JWT, 사용자 이름, ID 반환
  - `GET /auth/auth`: JWT를 검증하고 토큰의 사용자 정보 반환
- 게시글은 댓글 및 좋아요와 일대다 관계이고, 사용자는 좋아요와 일대다 관계입니다.

인증 토큰은 요청 헤더 `accessToken`으로 전달합니다. 현재 JWT 서명 키 `importantsecret`은 코드에 직접 입력되어 있으므로 배포 전에 안전한 비밀 관리 방식으로 옮기세요. 게시글 생성 API에는 인증 미들웨어가 적용되어 있지 않습니다. 댓글 삭제 API도 로그인만 확인하고 댓글 소유권은 검사하지 않습니다.

## 기술 스택

- Node.js (CommonJS)
- Express 5
- Sequelize 6
- MySQL (`mysql2`)
- bcrypt, jsonwebtoken
- Nodemon

## 사전 준비 및 실행

- Node.js와 npm
- 실행 중인 MySQL 서버
- `config/config.json`에 설정된 데이터베이스. 기본 개발 데이터베이스는 `TutorialDB`입니다.

DB 계정 정보를 실행 환경에 맞게 설정하고 민감한 값은 저장소에 커밋하지 마세요.

```bash
npm install
npm start
```

모델 동기화가 완료되면 API 서버가 `http://localhost:3001`에서 실행됩니다.

## API

모든 경로는 `http://localhost:3001`을 기준으로 합니다.

### 게시글

| Method | 경로 | 설명 |
|---|---|---|
| `GET` | `/posts` | 게시글과 좋아요 정보 조회 |
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

### 댓글

| Method | 경로 | 설명 |
|---|---|---|
| `GET` | `/comments/:postId` | 해당 게시글 댓글 조회 |
| `POST` | `/comments` | 인증된 사용자로 댓글 생성 |
| `DELETE` | `/comments/:commentId` | 인증된 요청으로 댓글 삭제 |

댓글 생성 요청은 `accessToken` 헤더와 다음 JSON 본문을 사용합니다.

```json
{
  "commentBody": "댓글 내용",
  "PostId": 1
}
```

작성자 이름은 JWT에서 가져옵니다. 삭제 라우트는 현재 토큰 유효성만 확인하고 해당 댓글의 작성자인지 확인하지 않습니다.

### 좋아요

```http
POST /likes
accessToken: <JWT>
Content-Type: application/json
```

```json
{
  "PostId": 1
}
```

이미 좋아요한 게시글이면 취소하고, 그렇지 않으면 좋아요를 추가합니다. 응답은 `{ "liked": true }` 또는 `{ "liked": false }`입니다.

### 사용자 인증

| Method | 경로 | 설명 |
|---|---|---|
| `POST` | `/auth` | 회원가입 |
| `POST` | `/auth/login` | 로그인 및 JWT 발급 |
| `GET` | `/auth/auth` | JWT 확인 및 사용자 정보 반환 |

회원가입 및 로그인 본문:

```json
{
  "username": "사용자 이름",
  "password": "비밀번호"
}
```

로그인 성공 응답:

```json
{
  "token": "<JWT>",
  "username": "사용자 이름",
  "id": 1
}
```

## 주요 파일

```text
config/
└── config.json                 # Sequelize 환경별 MySQL 설정
middlewares/
└── AuthMiddleware.js           # accessToken 검증과 요청 사용자 설정
models/
├── index.js                    # Sequelize 초기화, 모델 로드와 관계 설정
├── Posts.js                    # 게시글 모델과 댓글·좋아요 관계
├── Comments.js                 # 댓글 모델
├── Likes.js                    # 좋아요 모델
└── Users.js                    # 사용자와 해시된 비밀번호 모델
routes/
├── Posts.js                    # 게시글 API
├── Comments.js                 # 댓글 API
├── Likes.js                    # 좋아요 토글 API
└── Users.js                    # 회원가입·로그인·토큰 확인 API
index.js                        # Express 미들웨어, 라우터, 서버 시작
package.json                    # 의존성과 실행 스크립트
```

## 테스트

현재 자동화 테스트는 구현되어 있지 않습니다. `npm test`는 테스트 미구현 안내를 출력하고 실패하도록 설정되어 있습니다.
