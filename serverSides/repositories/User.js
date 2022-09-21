console.log(`${__filename}:1`);

const {selectOne} = require('../mysqlPool');

module.exports = {
    selectOneWhereId: id => selectOne(`SELECT * FROM User WHERE UserId = ?`, [id]),
};