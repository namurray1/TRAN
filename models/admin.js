module.exports = function (sequelize, DataTypes) {
    var Admins = sequelize.define("Admins", {
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        organization_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
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
        },
        non_profit_id: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    }, {
        // To create an association between Users and User
        classMethods: {
            associate: function (models) {
                //
                Admins.belongsTo(models.AllUsers);
            }
        }
    })
    return Admins;
};