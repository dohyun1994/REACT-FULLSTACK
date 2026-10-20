const express = require("express");
const router = express.Router();

const { Comments } = require("../models");

// 게시글 ID로 해당 게시글에 연결된 댓글 목록을 반환합니다.
router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({ where: { PostId: postId } });
    res.json(comments);
});

// 요청 본문의 댓글 데이터를 데이터베이스에 저장합니다.
router.post("/", async (req, res) => {
    const comment = req.body;
    await Comments.create(comment);
    res.json(comment);
});

module.exports = router;