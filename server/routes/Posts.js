const express = require("express");
const router = express.Router();

const { Posts, Likes } = require("../models");

// 데이터베이스에 저장된 게시글 전체를 반환합니다.
router.get("/", async (req, res) => {
  // 좋아요 연관 데이터를 포함해 게시글 목록을 조회합니다.
  const listOfPosts = await Posts.findAll({include : [Likes]});
  res.json(listOfPosts);
});


// 특정 게시글을 ID로 조회하여 반환합니다.
router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
});

// 요청 본문을 새 게시글로 저장하고 생성 데이터를 반환합니다.
router.post("/", async (req, res) => {
    const post = req.body;
    await Posts.create(post);
    res.json(post);
  
});



module.exports = router;