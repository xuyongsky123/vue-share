var express = require('express');
var router = express.Router();

//导入redis模块
//引入redis包
var redis = require('redis');
//创建客户端
var client = redis.createClient();
//链接提示
// client.on("connect",function(error){
//     console.log('connect ...');
// });
//redis链接错误提示
client.on("error",function(error){
    console.log('errorxy:'+error);
});

client.set("string key", "string val", redis.print);
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
client.hkeys("hash key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
    client.quit();
});


module.exports = router;