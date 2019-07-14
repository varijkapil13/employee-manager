'use strict';
module.exports = (sequelize, DataTypes) => {
  const Overtime = sequelize.define(
    'Overtime',
    {
      avatarId: DataTypes.INTEGER,
      hours: DataTypes.DECIMAL(10, 2)
    },
    {}
  );
  Overtime.associate = function(models) {
    // associations can be defined here
    Overtime.belongsTo(models.Avatar, {
      foreignKey: 'avatarId'
    });
  };
  return Overtime;
};
