export default (sequelize, DataTypes) => {
    const Holiday = sequelize.define('Holiday', {
        date: {
            type: DataTypes.DATE,
            allowNull: {
                args: false,
                msg: 'Please enter a date'
            }
        },
        notes: DataTypes.STRING,
        from: {
            type: DataTypes.TIME,
            allowNull: {
                args: false,
                msg: 'Please enter start time'
            }
        },
        to: {
            type: DataTypes.TIME,
            allowNull: {
                args: false,
                msg: 'Please enter end time'
            }
        },
    }, {});
    Holiday.associate = function (models) {
        // associations can be defined here
    };
    return Holiday;
};