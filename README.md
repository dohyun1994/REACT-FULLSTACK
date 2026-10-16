# REACT-FULLSTACK

React 클라이언트와 Express 서버로 구성할 예정인 프로젝트입니다. 현재는 서버의 기본 실행 구조와 Sequelize 게시글 모델이 구현되어 있습니다.

## 현재 구현된 내용

- Express 앱을 생성하고 MySQL 데이터베이스를 Sequelize로 초기화합니다.
- 데이터베이스 동기화가 완료되면 서버가 포트 `3001`에서 시작됩니다.
- `Posts` 모델에 다음 필드가 정의되어 있습니다.
  - `title`: 제목 (필수)
  - `postText`: 게시글 내용 (필수)
  - `username`: 작성자 이름 (필수)
  - Sequelize 기본 `id`, `createdAt`, `updatedAt` 필드
- 모델은 `server/models` 디렉터리에서 자동으로 로드됩니다.

현재 게시글 API 라우트와 React 클라이언트는 아직 구현되어 있지 않습니다.

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
    ├── index.js            # Express 서버 진입점
    └── package.json        # 서버 의존성과 실행 스크립트
```

## 테스트

현재 테스트는 작성되어 있지 않습니다. `server/package.json`의 `test` 스크립트는 테스트 미구현 안내 후 실패하도록 설정되어 있습니다.
