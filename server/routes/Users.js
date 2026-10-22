const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

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

// 사용자 이름으로 계정을 찾고 입력한 비밀번호를 저장된 해시와 비교합니다.
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    res.json("YOU LOGGED IN!!!");
  });
});

module.exports = router;