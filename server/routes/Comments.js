const express = require("express");
const router = express.Router();

const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// 게시글 ID로 해당 게시글에 연결된 댓글 목록을 반환합니다.
router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    const comments = await Comments.findAll({ where: { PostId: postId } });
    res.json(comments);
});

// JWT를 검증한 뒤 인증된 사용자 이름을 댓글에 연결해 저장합니다.
router.post("/", validateToken, async (req, res) => {
    const comment = req.body;
    const username = req.user.username;
    comment.username = username;
    await Comments.create(comment);
    res.json(comment);
});

module.exports = router;