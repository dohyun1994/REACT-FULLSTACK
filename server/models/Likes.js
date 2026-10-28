module.exports = (sequelize, DataTypes) => {
  // 좋아요 테이블의 필수 내용을 정의합니다. Posts 관계의 외래 키는 관계 설정 시 추가됩니다.
  const Likes = sequelize.define("Likes", {
    
  });

  return Likes;
}