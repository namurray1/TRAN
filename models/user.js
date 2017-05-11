module.exports = function(sequelize, DataTypes) {
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