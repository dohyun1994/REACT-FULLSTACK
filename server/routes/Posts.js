const express = require("express");
const router = express.Router();

const { Posts } = require("../models");

// 데이터베이스에 저장된 게시글 전체를 반환합니다.
router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll();
  res.json(listOfPosts);
});

// 요청 본문을 새 게시글로 저장하고 생성 데이터를 반환합니다.
router.post("/", async (req, res) => {
    const post = req.body;
    await Posts.create(post);
    res.json(post);
  
});

module.exports = router;