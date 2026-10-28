module.exports = (sequelize, DataTypes) => {
  // Users 테이블과 필수 username 및 password 필드를 정의합니다.
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Likes, {
        onDelete: "CASCADE", // 사용자가 삭제될 때 관련된 좋아요도 함께 삭제되도록 설정합니다.
    });

  }
  return Users;
}