//导入mysql模块
var mysql = require('mysql');
//使用配置信息创建一个mysql链接池
var pool = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"expressDB",
    port:3306
});

module.exports = pool;