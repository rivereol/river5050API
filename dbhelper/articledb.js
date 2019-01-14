const mongoose = require('mongoose')
const articleModel = require('../model/article.js')


let articleDBAdd = async(title, content, tag) => {
	return await new articleModel(
		{
			title,
			content,
			tag,
			"comment": []
		}).save((err, doc) => {
		if (err) {
			return false
		} else {
			return true
		}
	})
}

let articleDBDelete = async(id) => {
	let OBJId = mongoose.Types.ObjectId(id)
	await articleModel.findByIdAndDelete(OBJId)
}

let articleDBUpdateArt = async(id, title, content) => {
	let OBJId = mongoose.Types.ObjectId(id)
	return await articleModel.findByIdAndUpdate(OBJId, {"title": title, "content": content}, (err, doc) => {
		if (err) {
			return false
		} else {
			return true
		}
	})
}

let articleDBUpdateCom = async (id, name, content) => {
	return articleModel.find(async (err, docs) => {
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

let updataComment = (id, commentList) => {
	let _id = mongoose.Types.ObjectId()
	let query = {_id: id}
	articleModel.findOneAndUpdate(query, {"comment": commentList}, (err, docs) => {
		if (err) {
			console.log("err:", err)
		} else {
			return
		}
	})
}

let articleDBSearch = async(key) => {
	return await articleModel.find(
		{
			"$or":[
				{title: {$regex: key}},//模糊查询
				{content: {$regex: key}}
			]
		}, (err, docs) => {
		if (err) {
			return false
		} else {
			docs.forEach(doc => {
				doc.createdAt = doc.createdAt.toLocaleString()
			})
			return docs
		}
	})
}

let articleDBFindById = async(id) => {
	let OBJId = mongoose.Types.ObjectId(id)
	return articleModel.findById(OBJId, null, {lean: true}, (err, doc) => {
		return Promise.resolve()
	})
}

//ok
let articleDB = async (limitNum, offset) => {
	return  articleModel.find({}, null, {lean: true}).sort('-createdAt').limit(limitNum).skip(offset).then((res) => {
		res.forEach(doc => {
			doc.createdAt = doc.createdAt.toLocaleString()
			doc.content = doc.content.slice(0, 100)
		})
		return Promise.resolve(res)
	})
}
//ok
let articleDBCount = async () => {
	let count = articleModel.estimatedDocumentCount()
	return Promise.resolve(count)
}

let articleDBFindByTag = async (tag) => {
	return articleModel.find({tag}).then(docs => {
		docs.forEach((doc => {
			doc.createdAt = doc.createdAt.toLocaleString()
		}))
		return Promise.resolve(docs)
	})
}

let articleGetTag = async () => {
	return articleModel.find().distinct('tag').then(res => {
		return Promise.resolve(res)
	})
}

let articleDBLatest = async (limitNum) => {
	return articleModel.find({}, {_id: 1, title:1}).sort('-createdAt').limit(limitNum).then(res => {
		return Promise.resolve(res)
	})
}

module.exports = {
	articleDBAdd,
	articleDBDelete,
	articleDBUpdateArt,
	articleDBUpdateCom,
	articleDBSearch,
	articleDBFindById,
	articleDB,
	articleDBCount,
	articleDBFindByTag,
	articleGetTag,
	articleDBLatest
}
