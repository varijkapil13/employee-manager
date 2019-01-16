export default (sequelize, DataTypes) => {
    const Leave = sequelize.define('Leave', {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: {
                args: false,
                msg: 'Please enter user\'s name'
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
    Leave.associate = function (models) {
        // associations can be defined here
    };
    return Leave;
};