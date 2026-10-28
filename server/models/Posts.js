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

  Posts.associate = (models) => {
    // Posts 모델과 Comments 모델 간의 일대다 관계를 설정합니다.
    Posts.hasMany(models.Comments, {
      onDelete: "CASCADE", // 게시글이 삭제될 때 관련된 댓글도 함께 삭제되도록 설정합니다.
    });
    
    // Posts 모델과 Likes 모델 간의 일대다 관계를 설정합니다.
    Posts.hasMany(models.Likes, {
      onDelete: "CASCADE", // 게시글이 삭제될 때 관련된 좋아요도 함께 삭제되도록 설정합니다.
    });
  }

  return Posts;
}