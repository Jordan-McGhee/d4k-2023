const { Sequelize, Model, DataTypes } = require('sequelize')

const connect = () => {
    
    const hostName = process.env.DATABASE_HOST
    const userName = process.env.DATABASE_USER
    const database = process.env.DATABASE
    const dialect = process.env.DATABASE_DIALECT

    const sequelize = new Sequelize(database, userName, {
        host: hostName,
        dialect: dialect,
        operatorsAliases: false,
        pool: {
            max: 10,
            min: 0,
            acquire: 20000,
            idle: 5000
        }
    })

    const db = {}
    db.Sequelize = Sequelize
    db.sequelize = sequelize

    return db
}

module.exports = connect