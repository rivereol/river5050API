const {
	commentDBAdd,
	commentDBDelete,
	commentDB,
	commentDBCount,
	commentDBReply,
	commentLatest
} = require('../dbhelper/commentdb')
//ok
let fn_commentAdd = async(ctx, next) => {
	let name = ctx.request.body.params.name || ''
	let content = ctx.request.body.params.content || ''
	if (name && content) {
		ctx.response.body = await commentDBAdd(name, content)
	} else {
		console.log("name or content is null")
		ctx.response.body = false
	}
}

let fn_commentReply = async(ctx, next) => {
	//let comment_id = ctx.request.body.params.comment_id || ''
	let id = ctx.request.body.params.id || ''
	let name = ctx.request.body.params.name || ''
	let content = ctx.request.body.params.content || ''
	let res = await commentDBReply(id, name, content)
	ctx.response.body = res
	if (res) {
		console.log("update success")
		ctx.response.body = res
	} else {
		console.log("update fail,res", res)
		ctx.response.body = false
	}	
}

let fn_commentDelete = async(ctx, next) => {
	let id = ctx.params.id || ''
	if (id) {
		//假的await
		await commentDBDelete(id)	
	} else {
		console.log("id error")
		ctx.response.body = false
	}
}
//ok
let fn_commentList = async(ctx, next) => {
	let limit = Number(ctx.request.query.limit)
	let offset = Number(ctx.request.query.page - 1) * limit
	ctx.response.body = await commentDB(limit, offset)
}

let fn_commentCount = async (ctx, next) => {
	await commentDBCount().then(res => {
		ctx.response.body = res
	})
}

let fn_commentLatest = async (ctx, next) => {
	let limit = Number(ctx.request.query.limit)
	ctx.response.body = await commentLatest(limit)
}

module.exports = {
	'POST /commentAdd': fn_commentAdd,
	'POST /commentReply': fn_commentReply,
	'GET /commentDelete/:id': fn_commentDelete,
	'GET /commentList': fn_commentList,
	'GET /commentCount': fn_commentCount,
	'GET /commentLatest': fn_commentLatest
}