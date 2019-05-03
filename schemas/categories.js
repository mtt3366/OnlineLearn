
var mongoose = require('mongoose');

//分类的表结构
module.exports = new mongoose.Schema({

    //分类名称
    name: String,
    contentLength: {
        type: Number,
        default: 0
    }

},{timestamps: {createdAt: 'created', updatedAt: 'updated'}, usePushEach: true});