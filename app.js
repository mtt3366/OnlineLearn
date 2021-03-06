
//加载express模块
var express = require('express');
//加载模板处理模块
var swig = require('swig');
//加载数据库模块
var mongoose = require('mongoose');
//加载body-parser，用来处理post提交过来的数据
var bodyParser = require('body-parser');
//加载cookies模块
var Cookies = require('cookies');
//创建app应用 => NodeJS Http.createServer();
var app = express();

var User = require('./models/User');

//设置静态文件托管
//当用户访问的url以/public开始，那么直接返回对应服务器的__dirname + '/public'下的文件
app.use( '/public', express.static( __dirname + '/public') );

//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile);
//设置模板文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set('views', './views');
//注册所使用的模板引擎，第一个参数必须是 view engine，第二个参数和app.engine这个方法中定义的模板引擎的名称（第一个参数）是一致的
app.set('view engine', 'html');
//在开发过程中，需要取消模板缓存
swig.setDefaults({cache: false});

//bodyparser设置,解析post的urlencoded类型的请求
app.use( bodyParser.urlencoded({extended: true}) );

//设置cookie的处理,保存用户登录状态
app.use( function(req, res, next) {//不论用户走哪个请求,斗湖走这个中间件,用来处理
    req.cookies = new Cookies(req, res);
    //req.cookies下面的get方法和set方法操作cookie,先放在中间件里面,方便api第116行来进行操作

    //解析登录用户的cookie信息
    req.userInfo = {};
    //做两件事
    //1. 如果有userInfo,就吧req里加上userInfo的id和用户名,没有就啥都不做
    //2. 如果是管理员,就要在req里加上
    if (req.cookies.get('userInfo')) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));

            //获取当前登录用户的类型，是否是管理员
            User.findById(req.userInfo._id).then(function(userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            })
        }catch(e){
            next();
        }

    } else {
        next();
    }
} );

/*
* 根据不同的功能划分模块
* */
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

//监听http请求
mongoose.Promise = global.Promise;
var db=mongoose.connect('mongodb://localhost:27017/Blog2', function(err) {
    if (err) {
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功');
        app.listen(8081);
        console.log('打开本地端口: http://localhost:8081/ ');
    }
});
