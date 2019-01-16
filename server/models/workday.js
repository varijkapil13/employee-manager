export default (sequelize, DataTypes) => {
    const WorkDay = sequelize.define('WorkDay', {
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
        tags: DataTypes.STRING,
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
        logged_hours: {type: DataTypes.DOUBLE}
    }, {});
    WorkDay.associate = function (models) {
        // associations can be defined here
    };
    return WorkDay;
};