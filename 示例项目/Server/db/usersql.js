var UserSQL = {
    insert:'INSERT INTO Users (id,pwd,userName) VALUES(uuid(),?,?)',
    queryAll:'SELECT * FROM Users',
    getUserById:'SELECT * FROM Users WHERE uid = ?'
};
module.exports = UserSQL;