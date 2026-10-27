# Server

Express와 Sequelize 기반 API 서버입니다. MySQL에 게시글, 댓글, 사용자 정보를 저장하며 JWT를 사용해 로그인과 댓글 작성을 인증합니다.

## 구현된 기능

- Express JSON 요청 본문 파싱과 CORS 미들웨어
- Sequelize를 통한 MySQL 연결 및 모델 동기화
- 게시글 API (`/posts`)
  - `GET /posts`: 전체 게시글 조회
  - `GET /posts/byId/:id`: ID로 게시글 조회
  - `POST /posts`: 게시글 생성
- 댓글 API (`/comments`)
  - `GET /comments/:postId`: 특정 게시글의 댓글 조회
  - `POST /comments`: 로그인 토큰을 검증한 후 댓글 생성. 작성자 이름은 토큰의 사용자 정보에서 가져옵니다.
- 사용자 API (`/auth`)
  - `POST /auth`: 비밀번호를 bcrypt로 해시해 사용자 계정 생성
  - `POST /auth/login`: 비밀번호를 확인하고 JWT 발급
  - `GET /auth/auth`: JWT를 검증하고 토큰의 사용자 정보를 반환
- 게시글과 댓글은 일대다 관계이며, 게시글 삭제 시 연결된 댓글도 삭제되도록 설정되어 있습니다.

인증 토큰은 요청 헤더 `accessToken`으로 전달합니다. 현재 JWT 서명 키 `importantsecret`은 코드에 직접 입력되어 있으므로 배포 전에 환경변수나 비밀 관리 설정으로 옮겨야 합니다. JWT는 댓글 생성 API에 적용되어 있으며, 게시글 생성 API에는 인증 미들웨어가 연결되어 있지 않습니다.

## 기술 스택

- Node.js (CommonJS)
- Express 5
- Sequelize 6
- MySQL (`mysql2`)
- bcrypt
- jsonwebtoken
- Nodemon

## 사전 준비

- Node.js와 npm
- 실행 중인 MySQL 서버
- `config/config.json`에 지정된 데이터베이스. 기본 개발 데이터베이스는 `TutorialDB`입니다.

DB 계정 정보를 실행 환경에 맞게 설정하세요. 비밀번호 등 민감한 값은 저장소에 커밋하지 마세요.

## 실행 방법

```bash
npm install
npm start
```

서버는 데이터베이스 모델 동기화가 완료된 뒤 `http://localhost:3001`에서 요청을 받습니다.

## API 사용 예시

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

### 댓글

| Method | 경로 | 설명 |
|---|---|---|
| `GET` | `/comments/:postId` | 게시글 댓글 조회 |
| `POST` | `/comments` | 인증된 사용자로 댓글 생성 |

댓글 생성 요청은 `accessToken` 헤더와 다음 JSON 본문을 사용합니다.

```json
{
  "commentBody": "댓글 내용",
  "PostId": 1
}
```

댓글의 작성자 이름은 토큰에서 가져옵니다.

### 회원가입 및 로그인

회원가입:

```http
POST /auth
Content-Type: application/json
```

로그인:

```http
POST /auth/login
Content-Type: application/json
```

두 API 모두 다음 형식의 JSON 본문을 받습니다.

```json
{
  "username": "사용자 이름",
  "password": "비밀번호"
}
```

로그인 성공 응답은 JWT 문자열입니다. 클라이언트는 이 토큰을 이후 인증 요청의 `accessToken` 헤더에 포함합니다.

토큰 확인:

```http
GET /auth/auth
accessToken: <JWT>
```

## 주요 파일

```text
config/
└── config.json                 # Sequelize 환경별 MySQL 설정
middlewares/
└── AuthMiddleware.js           # accessToken 검증 및 사용자 정보 연결
models/
├── index.js                    # Sequelize 초기화, 모델 로드와 관계 설정
├── Posts.js                    # 게시글 모델 및 댓글 관계
├── Comments.js                 # 댓글 모델
└── Users.js                    # 사용자와 해시된 비밀번호 모델
routes/
├── Posts.js                    # 게시글 API
├── Comments.js                 # 댓글 API
└── Users.js                    # 회원가입·로그인·토큰 확인 API
index.js                        # Express 미들웨어, 라우터, 서버 시작
package.json                    # 의존성과 실행 스크립트
```

## 테스트

현재 자동화 테스트는 구현되어 있지 않습니다. `npm test`는 테스트 미구현 안내를 출력하고 실패하도록 설정되어 있습니다.
