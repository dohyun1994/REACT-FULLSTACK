const express = require("express");
const app = express();
const cors = require("cors");

// JSON 요청 본문을 읽고 클라이언트의 교차 출처 요청을 허용합니다.
app.use(express.json());
app.use(cors());

const db  = require("./models");

// 게시글 API를 /posts 경로에 연결합니다.
const postRouter = require("./routes/Posts");

app.use("/posts", postRouter);

// 데이터베이스 모델 동기화가 끝난 뒤 API 서버를 시작합니다.
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
    console.log("Server is running on port 3001");
    });
});
