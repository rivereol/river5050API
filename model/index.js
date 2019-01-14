//开启mongoose对Promise的支持
let mongoose = require('mongoose');
let Promise = require('bluebird');
    
mongoose.Promise = Promise;

module.exports = mongoose;

//移除警告
mongoose.set('useFindAndModify', false);