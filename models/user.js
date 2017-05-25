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
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
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
    }, {
        // To create an association between Users and Admins
        classMethods: {
            associate: function (models) {
                //
                User.belongsTo(models.AllUsers);
            }
        }
    });
    return User;
};