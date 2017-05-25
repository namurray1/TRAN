module.exports = function (sequelize, DataTypes) {
    var AllUsers = sequelize.define("AllUsers", {
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: true
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
                defaultValue: 'unknown',
                isIn: [
                    ['admin', 'user', "unknown"]
                ]
            }
        },

        {
            classMethods: {
                associate: function (models) {
                    // include both user and admins tables into this table
                    AllUsers.hasMany(models.User);
                    AllUsers.hasMany(models.Admins);
                }
            }
        }
    )
    return AllUsers;
};