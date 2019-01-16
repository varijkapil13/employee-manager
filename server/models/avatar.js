export default (sequelize, DataTypes) => {
    const Avatar = sequelize.define('Avatar', {
        first_name: {
            type     : DataTypes.STRING,
            allowNull: {
                args: false,
                msg : 'Please enter the first name'
            }
        },
        last_name : {
            type     : DataTypes.STRING,
            allowNull: {
                args: false,
                msg : 'Please enter the last name'
            }
        },
        email     : {
            type     : DataTypes.STRING,
            allowNull: {
                args: false,
                msg : 'Please enter the email'
            },
            unique :{
                args : true,
                msg: 'Email already exists!'
            },
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Please enter a valid email address'
                },
            },
        }
    }, {});
    Avatar.associate = function (models) {
        // associations can be defined here
        Avatar.hasOne(models.User, {
            foreignKey: 'avatarId',
        });
    };
    return Avatar;
}