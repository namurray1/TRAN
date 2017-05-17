module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: true
                }
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [1]
                }
            },
            hash: {
                type: DataTypes.STRING
            },
            salt: {
                type: DataTypes.STRING
            },
            animals_delivered: {
                type: DataTypes.INTEGER(11),
                allowNull: true,
                validate: {
                    len: [1]
                }
            },
            user_volunteered_flag: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                validate: {
                    len: [1]
                }
            },
            lat: {
                type: DataTypes.DECIMAL(17, 14),
                allowNull: false,
                validate: {
                    min: -90,
                    max: 90
                }
            },
            lng: {
                type: DataTypes.DECIMAL(17, 14),
                allowNull: false,
                validate: {
                    min: -180,
                    max: 180
                }
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'user',
                isIn: [
                    ['admin', 'user']
                ]
            }
        }
        // // TODO
        // // do we need to associate users and admins here?
        // ,
        // // To create an association between Users and Admins
        // {
        //     classMethods: {
        //         associate: function(models) {
        //             //
        //             User.hasMany(models.Admins);
        //         }
        //     }
        // }
    );
    return User;
};