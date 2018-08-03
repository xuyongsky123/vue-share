var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var sess = req.session;
    //var loginUser = sess.loginUser;

    //res.json(sess)
    res.render('index',{
      title:'express 首页'
    })
    // res.render('index', {
    //     title: loginUser || ''
    // });
});

module.exports = router;
