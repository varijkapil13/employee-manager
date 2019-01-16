export default (sequelize, DataTypes) => {
  const Holiday = sequelize.define(
    'Holiday',
    {
      date: {
        type: DataTypes.DATE,
        allowNull: {
          args: false,
          msg: 'Please enter a date'
        }
      },
      notes: DataTypes.STRING,
      from: DataTypes.TIME,
      to: DataTypes.TIME
    },
    {}
  );
  Holiday.associate = function(models) {
    // associations can be defined here
  };
  return Holiday;
};
