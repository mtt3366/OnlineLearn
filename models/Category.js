//模型类是基于表结构进行处理的,创建模型类后,通过模型类进行增删改查操作

var mongoose = require('mongoose');
var categoriesSchema = require('../schemas/categories');
//现将表结构引入,然后mongoose就创建Category表,返回一个类,类中有增删改查的操作
module.exports = mongoose.model('Category', categoriesSchema);