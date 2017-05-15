module.exports = function (sequelize, DataTypes) {
    var Animal = sequelize.define("Animal", {
        pet_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        pet_type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        breed: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        weight: {
            type: DataTypes.DECIMAL(3, 2),
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        temperament: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        special_needs: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        lat: {
            type: DataTypes.DECIMAL(3 , 14),
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        lng: {
            type: DataTypes.DECIMAL(3 , 14),
            allowNull: false,
            validate: {
                len: [1]
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
        //             Animal.hasMany(models.Admins);
        //         }
        //     }
        // }
    )
    return Animal;
};