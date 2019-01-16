export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email     : {
            type     : DataTypes.STRING,
            allowNull: {
                args: false,
                msg : 'Please enter an email'
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
        },
        password     : {
            type     : DataTypes.STRING,
            allowNull: {
                args: false,
                msg : 'Please enter a password'
            },
            validate: {
                isNotShort: (value) => {
                    if (value.length < 8) {
                        throw new Error('Password should be at least 8 characters');
                    }
                },
            },
        },
        roles: {
            type: DataTypes.STRING,
            allowNull: {
                args: false,
                msg : 'No roles were provided'
            },
        },
        avatarId: {
            type: DataTypes.INTEGER,
            references :{
                model: 'Avatar',
                key: 'id',
                as: 'avatarId',
            }
        }
    }, {});
    User.associate = function (models) {
        // associations can be defined here
        User.belongsTo(models.Avatar, {
            foreignKey: 'avatarId',
        });
    };
    return User;
}