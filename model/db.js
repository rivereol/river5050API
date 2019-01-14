const mongoose = require('mongoose')

const dbConnect = async function() {
	mongoose.connect("mongodb://localhost/river", {useNewUrlParser: true}, function(err) {
		if (err) {
			console.log('数据库连接失败')
		} else {
			console.log('数据库连接成功da☆ze')
		}
	})
} 

module.exports = dbConnect