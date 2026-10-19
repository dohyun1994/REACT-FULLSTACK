module.exports = (sequelize, DataTypes) => {
  // 게시글 테이블과 필수 제목, 본문, 작성자 필드를 정의합니다.
  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Posts;
}