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

  // Users.associate = (models) => {
  //   Users.hasMany(models.Posts, {
  //     onDelete: "cascade",
  //   });
  // }


  return Users;
}