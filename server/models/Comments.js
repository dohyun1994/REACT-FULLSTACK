module.exports = (sequelize, DataTypes) => {
  // 댓글 테이블의 필수 내용을 정의합니다. Posts 관계의 외래 키는 관계 설정 시 추가됩니다.
  const Comments = sequelize.define("Comments", {
    commentBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return Comments;
}