# Server

> 示例后端项目

## 注意Server/db/DBhandler.js mysql数据库的链接参数配置

```javascript
//使用配置信息创建一个mysql链接池
var pool = mysql.createPool({
    host:"127.0.0.1",   //本地ip地址
    user:"root",    //本地mysql登录用户名
    password:"",    //本地mysql登录密码
    database:"expressDB",   //本项目数据库名
    port:3306   //mysql占用端口
});
```

```javascript
//以上是需要配置mysql，如果仅测试session-cookie则修改相关接口，制造假数据用以操作
//例如利用假数据修改登录接口
router.post('/', function(req, res, next) {
    var param = req.body || req.query || req.params;
    var result = [  //假数据（模仿数据库中查出的所有用户信息）
        {userName:'aaa',pwd:'xxxx'},
        {userName:'bbb',pwd:'xxxx'}
    ]
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
});
//以上值得注意的是session存储的地方是（而非redis）
```

## session-file-store  

### 注意session配置信息Server/app.js

```javascript
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var identityKey = 'skey';
//session
app.use(session({
  name: identityKey,
  secret: 'xuyongheihei',  // 用来对session id相关的cookie进行签名
  store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
  resave: false,  // 是否每次都重新保存会话，建议false
  cookie: {
      maxAge: 60 * 60 * 1000  // 有效期，单位是毫秒
  }
}));
```

### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
node app.js
```