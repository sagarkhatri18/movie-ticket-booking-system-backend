const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col,
    $between: Op.between,
    $like: Op.like,
    $notLike: Op.notLike,
    $and: Op.and,
    $or: Op.or
};

const sequelize = new Sequelize('NodeJSDemoDatabase', 'nodejs', 'password', {
    host: 'localhost',
    dialect: 'mssql',
    dialectOptions: {
        multipleStatements: true
    },
    logging: false,
    operatorsAliases,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = {
    sequelize: sequelize
}