

var mongoose = require('mongoose');

//内容的表结构
module.exports = new mongoose.Schema({

    //关联字段 - 内容分类的id
    category: {
        //类型
        type: mongoose.Schema.Types.ObjectId,//他存储的不是一个字符串，而是一个ObjectID类型，可以在数据库里看
        //引用
        ref: 'Category'//引用另一张表的模型
    },//该字段和其他字段存在关联关系，所以要引用

    //内容标题
    title: String,

    //关联字段 - 用户id
    user: {
        //类型
        type: mongoose.Schema.Types.ObjectId,
        //引用
        ref: 'User'
    },

    //添加时间
    addTime: {
        type: Date,
        default: new Date()
    },

    //阅读量
    views: {
        type: Number,
        default: 0
    },

    //简介
    description: {
        type: String,
        default: ''
    },

    //内容
    content: {
        type: String,
        default: ''
    },

    //video
    videoUrl: {
        type: String,
        default: ''
    },

    //内容
    coverUrl: {
        type: String,
        default: ''
    },

    //评论
    comments: {
        type: Array,
        default: []
    }

},{timestamps: {createdAt: 'created', updatedAt: 'updated'}, usePushEach: true});