export default (sequelize, DataTypes) => {
  const WorkDay = sequelize.define(
    'WorkDay',
    {
      avatarId: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
          msg: 'Please provide avatar id'
        }
      },
      date: {
        type: DataTypes.DATE,
        allowNull: {
          args: false,
          msg: 'Please enter a date'
        }
      },
      tags: DataTypes.STRING,
      notes: DataTypes.STRING,
      from: DataTypes.TIME,
      to: DataTypes.TIME,
      logged_hours: DataTypes.DOUBLE
    },
    {}
  );
  WorkDay.associate = function(models) {
    // associations can be defined here
  };
  return WorkDay;
};
