var express = require('express');
var router = express.Router();

var pool = require('../db/DBhandler');
var userSQL = require('../db/usersql');
/* GET home page. */
router.post('/', function(req, res, next) {
    pool.getConnection(function(err,connection){
        var param = req.body || req.query || req.params;
        connection.query(userSQL.queryAll,function(err,result){
            if (err) throw err
            if(result){
                //登录判断
                var user = result.find(function(item){
                    return item.pwd == param.pwd && item.userName ==param.userName;
                });

                if(user){
                    req.session.regenerate(function(err){
                        if(err){
                            return res.json({code: 441, msg: '登录失败，session生成失败！'})
                        }
                        req.session.loginUser = user.userName;
                        res.json({code: 222, msg: '登录成功！'})
                    });
                }else{
                    res.json({code: 442, msg: '登录失败，账号或密码错误！'})
                }
            }
            //释放链接
            connection.release();
        })
    })
});

module.exports = router;
