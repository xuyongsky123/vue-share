var express = require('express');
var router = express.Router();

//导入mysql模块
var pool = require('../db/DBhandler');
var userSQL = require('../db/usersql');
//相应一个JSON数据
var responseJSON = function(res,ret){
  if(typeof ret === 'undefined'){
    res.json({
      code:'-200',
      msg:'操作失败'
    });
  }else{
    res.json(ret);
  }
}

//添加用户
router.post('/register',function(req,res,next){
  //从链接池获取链接
  pool.getConnection(function(err,connection){
    //获取前台页面传过来的参数
    var param = req.body || req.query || req.params;
    //建立连接 增加一个用户信息
    connection.query(userSQL.insert,[param.pwd,param.userName],function(err,result){
      if (err) throw err

      if(result){
        res.json({code: 222, msg: '注册成功！'})
      }else{
        res.json({code: 222, msg: '注册失败，系统错误！'})
      }
      //释放链接
      connection.release();
    })
  })
})

//查询所有用户
router.get('/getAllUser',function(req,res,next){
  console.log(req.session)
  //从链接池获取链接
  pool.getConnection(function(err,connection){
    //获取前台页面传过来的参数
    var param = req.query || req.params;
    //建立连接 增加一个用户信息
    connection.query(userSQL.queryAll,function(err,result){
      if(result){
        var _result = {
          code:200,
          msg:'查询成功！'
        };
      }
      //以json形式，把操作结果返回给前台页面
      responseJSON(res,Object.assign(result,_result));
      //释放链接
      connection.release();
    })
  })
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
