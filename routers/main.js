
var express = require('express');
var router = express.Router();

var Category = require('../models/Category');
var Content = require('../models/Content');

var data;

/*
* 处理通用的数据
* */
router.use(function (req, res, next) {
    data = {
        userInfo: req.userInfo,//cookie里面的登录信息,如果没有的话,前台就不会继续出现已经登录的页面
        categories: []
    }

    Category.find().then(function(categories) {
        data.categories = categories;
        next();
    });
});

/*
* 首页
* */
router.get('/', function(req, res, next) {

    data.category = req.query.category || '';
    data.count = 0;
    data.page = Number(req.query.page || 1);
    data.limit = 3;//这里修改每页的限制
    data.pages = 0;

    var where = {};
    if (data.category) {
        where.category = data.category
    }

    Content.where(where).count().then(function(count) {

        data.count = count;
        //计算总页数
        data.pages = Math.ceil(data.count / data.limit);
        //取值不能超过pages
        data.page = Math.min( data.page, data.pages );
        //取值不能小于1
        data.page = Math.max( data.page, 1 );

        var skip = (data.page - 1) * data.limit;

        return Content.where(where).find().limit(data.limit).skip(skip).populate(['category', 'user']).sort({
            addTime: -1
        });

    }).then(function(contents) {
        data.contents = contents;
        res.render('main/index', data);
    })
});

router.get('/view', function (req, res){

    var contentId = req.query.contentid || '';

    Content.findOne({
        _id: contentId
    }).then(function (content) {
        content.views++;
        data.content = content;
        content.save();

        Category.findOne({//找到分類名字
            _id:content.category
        }).then(function(category){
            console.log(category);
            data.content.category = category
            res.render('main/view', data);
        })
        
    });

});

module.exports = router;