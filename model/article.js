const mongoose = require('./index')
const Schema = mongoose.Schema;

let articleSchema = new Schema({
	title: String,
	content: String,
	tag: {
		type: String,
		default: '其他'
	},
	comment: [{
		name: String,
		content: String,
		createdAt: Date,
		comment: []
	}]
}, {timestamps: true})

let articleModel = mongoose.model('articleModel', articleSchema);

module.exports = articleModel