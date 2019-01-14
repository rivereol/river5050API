// const articleSchema = require('model/article.js')
// const commentSchema = require('model/comment.js')
const articleModel = require('./model/article.js')
const webCommentModel = require('./model/comment.js')
const dbConnect = require('./model/db.js')
const mongoose = require('mongoose')

dbConnect();
// 填充article
for (let i = 1; i < 52; i++) {
	let articleDoc0 = new articleModel ({
		title: 'Test' + i,
		content: 'content' + i,
		comment: []
	}).save()
}


for (let i = 1; i < 52; i++) {
	new webCommentModel ({
		name: 'bjj',
		content: 'comment' + i,
		comment: []
	}).save()
}
	

// new ArticleCommentModel ({
// 	name: 'bjj',
// 	title: 'comment1',
// 	content: 'My first comment'
// }).save((err, doc) => {
// 	console.log(doc)
// })


//undefined 异步
// console.log(articleDoc0)