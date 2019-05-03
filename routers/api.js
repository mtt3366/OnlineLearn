
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Content = require('../models/Content');

//统一返回格式
var responseData;

router.use( function(req, res, next) {
    responseData = {//,初始化一下返回数据
        code: 0,//0代表无任何错误
        message: '',
    }

    next();
} );

/*
* 用户注册
*   注册逻辑
*
*   1.用户名不能为空
*   2.密码不能为空
*   3.两次输入密码必须一致
*
*   1.用户是否已经被注册了
*       数据库查询
*
* */
router.post('/user/register', function(req, res, next) {

    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;

    //用户是否为空
    if ( username == '' ) {
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return;
    }
    //密码不能为空
    if (password == '') {
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }
    //两次输入的密码必须一致
    if (password != repassword) {
        responseData.code = 3;
        responseData.message = '两次输入的密码不一致';
        res.json(responseData);
        return;
    }

    //用户名是否已经被注册了，如果数据库中已经存在和我们要注册的用户名同名的数据，表示该用户名已经被注册了
    User.findOne({//find方法和findOne方法是类的方法,sava必须new一个对象,对象方法因为是
        username: username
    }).then(function( userInfo ) {//返回值是查到的用户数据全部
        if ( userInfo ) {
            //表示数据库中有该记录
            responseData.code = 4;
            responseData.message = '用户名已经被注册了';
            res.json(responseData);
            return;
        }
        //保存用户注册的信息到数据库中
        var user = new User({//表示每一条记录,可以插入到数据库中
            username: username,
            password: password
        });
        return user.save();//返回的是一个promise对象,代表是否成功,所以结果可以继续在下面写
    }).then(function(newUserInfo) {//当保存成功后,他会执行这个回调函数,并且同时会把这个新纪录插入到这个参数里来
        responseData.message = '注册成功';
        res.json(responseData);
    });
});

/*
* 登录
* */
router.post('/user/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if ( username == '' || password == '' ) {
        responseData.code = 1;
        responseData.message = '用户名和密码不能为空';
        res.json(responseData);
        return;
    }

    //查询数据库中相同用户名和密码的记录是否存在，如果存在则登录成功
    User.findOne({
        username: username,
        password: password
    }).then(function(userInfo) {
        if (!userInfo) {
            responseData.code = 2;
            responseData.message = '用户名不存在或密码错误';
            res.json(responseData);
            return;
        }
        //用户名和密码是正确的
        responseData.message = '登录成功';
        responseData.userInfo = {
            _id: userInfo._id,
            username: userInfo.username
        }
        //登录成功后还需要做一个事情,就是给客户端发送一个cookie,
        //以后只要访问我们的站点,都会把这个cookie通过头信息的方式带过来给服务端
        //服务端来验证我们是否是登录状态
        req.cookies.set('userInfo', JSON.stringify({
            _id: userInfo._id,
            username: userInfo.username
        }));
        res.json(responseData);
        return;
    })

});

/*
* 退出
* */
router.get('/user/logout', function(req, res) {
    req.cookies.set('userInfo', null);
    res.json(responseData);
});

/*
* 获取指定文章的所有评论
* */
router.get('/comment', function(req, res) {
    var contentId = req.query.contentid || '';

    Content.findOne({
        _id: contentId
    }).then(function(content) {
        responseData.data = content.comments;
        res.json(responseData);
    })
});

/*
* 评论提交
* */
router.post('/comment/post', function(req, res) {
    //内容的id
    var contentId = req.body.contentid || '';
    var postData = {
        username: req.userInfo.username,
        postTime: new Date(),
        content: req.body.content
    };

    //查询当前这篇内容的信息
    Content.findOne({
        _id: contentId
    }).then(function(content) {
        content.comments.push(postData);
        return content.save();
    }).then(function(newContent) {
        responseData.message = '评论成功';
        responseData.data = newContent;
        res.json(responseData);
    });
});

/**
 * 学习历史的提交
 */

router.post('/addHistory', function(req, res) {
    //内容的id
    var contentId = req.body.contentid || '';
    var contentTitle = req.body.contentTitle || '';
    if(!contentId||!contentTitle){
        return
    }
    //窑要存的历史的三个字段，用户名，这篇文章内容的id，现在的时间
    var postData = {
        username: req.userInfo.username,
        contentId: contentId,
        contentTitle:contentTitle,
        postTime: new Date(),
    };

 
    //查询到这个用户，把历史纪录存进去
    User.findOne({
        username: req.userInfo.username//
    }).then(function(user) {
        user.viewHistory.push(postData);
        return user.save();
    }).then(function(newUser) {
        responseData.message = '添加历史纪录成功';
        responseData.data = newUser;
        res.json(responseData);
    });
});
/**
 * 
 * 学习历史的获取
 */
router.get('/getHistory', function(req, res) {
    var username = req.userInfo.username;

    User.findOne({
        username: username
    }).then(function(user) {
        responseData.data = user.viewHistory;
        res.json(responseData);
    })
});
module.exports = router;