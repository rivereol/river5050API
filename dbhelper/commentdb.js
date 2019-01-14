const mongoose = require('mongoose')
const WebCommentModel = require('../model/comment.js')

let commentDBAdd = async (name, content) => {
	return await new WebCommentModel(
		{
			"name": name,
			"content": content,
			"comment": []
		}).save((err, doc) => {
		if (err) {
			console.log("Add comment fail!")
			return false
		} else {
			console.log("Add comment success!")
			return doc
		}
	})
}

let commentDBReply = async (id, name, content) => {
	return WebCommentModel.find(async (err, docs) => {
		await docs.forEach(async doc => {
		 	await loop(doc, id, name, content).then(() => {
		 		doc.markModified('comment')
		 		doc.save()
		 	})
		})	
		return Promise.resolve()
	})
}

let loop = async (obj, target_id, name, content) => {
	if (obj._id.toString() === target_id.toString()) {
		let _id = mongoose.Types.ObjectId()
		let createdAt = new Date()
		obj.comment.push({
			_id,
			name,
			content,
			createdAt,
			"comment": []
		})
		//return Promise.resolve()
	} else {
		//不是这条评论，但它有子集，进行遍历
		if (obj.comment.length) {
			obj.comment.forEach(async item => {
				loop(item, target_id, name, content)
			})
		} else {
		}
	}
}

let commentDBDelete = async (id) => {
	let OBJId = mongoose.Types.ObjectId(id)
	return await WebCommentModel.findByIdAndDelete(OBJId)
}

let commentDB = async (limitNum, offset) => {
	return await WebCommentModel.find().sort('-createdAt').limit(limitNum).skip(offset).then(res => {
		res.forEach(doc => {
			doc.createdAt = doc.createdAt.toLocaleString()
		})
		return Promise.resolve(res)
	})
}

let commentDBCount = async () => {
	let count = WebCommentModel.estimatedDocumentCount()
	return Promise.resolve(count)
}

let commentLatest = async (limitNum) => {
	return WebCommentModel.find({}, {name:1, content:1}).sort('-createdAt').limit(limitNum).then(res => {
		return Promise.resolve(res)
	})
}


module.exports = {
	commentDBAdd,
	commentDBDelete,
	commentDB,
	commentDBCount,
	commentDBReply,
	commentLatest
}