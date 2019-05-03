

var mongoose = require('mongoose');

//用户的表结构
module.exports = new mongoose.Schema({

    //用户名
    username: String,
    //密码
    password: String,
    //是否是管理员
    isAdmin: {
        type: Boolean,
        default: false
    },
    //观看历史
    viewHistory:{
        type: Array,
        default: []
    }

},{timestamps: {createdAt: 'created', updatedAt: 'updated'}, usePushEach: true});