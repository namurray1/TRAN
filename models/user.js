module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
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
            phone: {
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
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'user',
                isIn: [
                    ['admin', 'user']
                ]
            },
            // animals_delivered: {
            //     type: DataTypes.INTEGER,
            //     allowNull: true,
            //     validate: {
            //         len: [1]
            //     }
            // },
            // // animal associated i.e. pet is with user en route to new destination
            // animal_id: {
            //     type: DataTypes.INTEGER,
            //     allowNull: true
            // },
            lat: {
                type: DataTypes.DECIMAL(17, 14),
                allowNull: true,
                validate: {
                    min: -90,
                    max: 90
                }
            },
            lng: {
                type: DataTypes.DECIMAL(17, 14),
                allowNull: true,
                validate: {
                    min: -180,
                    max: 180
                }
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
    return Users;
};