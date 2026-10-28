const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

// 회원가입 요청의 비밀번호를 해시한 뒤 사용자 계정을 생성합니다.
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  // 원문 비밀번호 대신 해시 결과를 데이터베이스에 저장합니다.
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({ 
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

// 사용자 자격 증명을 확인하고 성공하면 인증용 JWT를 발급합니다.
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    res.json({token: accessToken, username: user.username, id: user.id});
  });
});

// 요청의 JWT를 검증한 사용자 정보를 클라이언트에 반환합니다.
router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;