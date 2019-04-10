export default (sequelize, DataTypes) => {
  const Leave = sequelize.define(
    'Leave',
    {
      avatarId: {
        type: DataTypes.INTEGER,
        allowNull: {
          args: false,
          msg: 'Please enter an avatar id'
        }
      },
      date: {
        type: DataTypes.DATE,
        allowNull: {
          args: false,
          msg: 'Please enter a date'
        }
      },
      notes: DataTypes.STRING,
      overtime: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      from: {
        type: DataTypes.TIME,
        defaultValue: null
      },
      to: {
        type: DataTypes.TIME,
        defaultValue: null
      },
      approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {}
  );
  Leave.associate = function(models) {
    // associations can be defined here
  };
  return Leave;
};
