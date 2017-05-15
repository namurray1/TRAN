module.exports = function (sequelize, DataTypes) {
    var Volunteer = sequelize.define("Volunteer", {
            user_id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                validate: {
                    len: [1]
                }
            },
            animal_id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                validate: {
                    len: [1]
                }
            },
            animals_delivered: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                validate: {
                    len: [1]
                }
            },
            user_volunteered_flag: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    len: [1]
                }
            },
            lat: {
                type: DataTypes.DECIMAL(3, 14),
                allowNull: false,
                validate: {
                    len: [1]
                }
            },
            lng: {
                type: DataTypes.DECIMAL(3, 14),
                allowNull: false,
                validate: {
                    len: [1]
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
        //             Admin.hasMany(models.Admins);
        //         }
        //     }
        // }
    )
    return Volunteer;
};