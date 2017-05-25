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
        summary: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        link_to_picture: {
            type: DataTypes.STRING,
            allowNull: true
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
            allowNull: true
        },
        origin_phone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [10]
            }
        },
        destination_phone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [10]
            }
        },
        origin_address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        destination_address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        lat_origin: {
            type: DataTypes.DECIMAL(17, 14),
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        lng_origin: {
            type: DataTypes.DECIMAL(17 , 14),
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        lat_destination: {
            type: DataTypes.DECIMAL(17, 14),
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        lng_destination: {
            type: DataTypes.DECIMAL(17 , 14),
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