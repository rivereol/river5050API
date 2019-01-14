const {
		articleDBAdd,
		articleDBDelete,
		articleDBUpdateArt,
		articleDBUpdateCom,
		articleDBSearch,
		articleDB,
		articleDBFindById,
		articleDBCount,
		articleDBFindByTag,
		articleGetTag,
		articleDBLatest
} = require('../dbhelper/articledb.js')
//ok
let fn_articleAdd = async(ctx, next) => {
	let title = ctx.request.body.params.title
	let content = ctx.request.body.params.content
	let tag = ctx.request.body.params.content
	if (title && content) {
		ctx.response.body = await articleDBAdd(title, content, tag)
	} else {
		console.log("title or content is null")
		ctx.response.body = false
	}
}
//ok
let fn_articleDelete = async(ctx, next) => {
	let id = ctx.params.id || ''
	if (id) {
		console.log("Delete id:", id)
		await articleDBDelete(id)
		ctx.response.body = ''
	} else {
		console.log("err id")
		ctx.response.body = false
	}
}
//ok
let fn_articleUpdateArticle = async(ctx, next) => {
	let id = ctx.request.body.params.id || ''
	let title = ctx.request.body.params.title || ''
	let content = ctx.request.body.content || ''
	if (title && content) {
		let res = await articleDBUpdateArt(id, title, content)
		ctx.response.body = res
		if (res) {
			console.log("update success")
			ctx.response.body = res
		} else {
			console.log("update fail")
			ctx.response.body = false
		}	
	}
}

let fn_articleUpdateComment = async(ctx, next) => {
	let id = ctx.request.body.params.id
	let name = ctx.request.body.params.name
	let content = ctx.request.body.params.content
	let res = await articleDBUpdateCom(id, name, content)
	if (res) {
		console.log("update success")
		ctx.response.body = true
	} else {
		console.log("update fail,res", res)
		ctx.response.body = false
	}	
	
}
//ok
let fn_articleSeach = async(ctx, next) => {
	let key = ctx.params.key || ''
	if (key) {
		console.log("searching key:", key)
		let res = await articleDBSearch(key)
		ctx.response.body = res
	}
}
//ok
let fn_articleFind = async(ctx, next) => {
	let id = ctx.params.id || ''
	if (id) {
		console.log("searching id:", id)
		let res = await articleDBFindById(id)
		res.createdAt = res.createdAt.toLocaleString()
		ctx.response.body = res
	} else {
		console.log("err: id? id:", id)
		ctx.response.body = false
	}
}

//ok
let fn_articleList = async (ctx, next) => {
	let limit = Number(ctx.request.query.limit)
	let offset = Number(ctx.request.query.page - 1) * limit
	await articleDB(limit, offset).then(res => {
		ctx.response.body = res
	})
}
//ok
let fn_articleCount = async (ctx, next) => {
	await articleDBCount().then(res => {
		ctx.response.body = res
	})
}
//ok
let fn_articleFindByTag = async (ctx, next) => {
	let tag = ctx.params.tag
	let res = await articleDBFindByTag(tag)
	ctx.response.body = res
}

let fn_articleGetTag = async (ctx, next) => {
	ctx.response.body = await articleGetTag()
}

let fn_articleLatest = async (ctx, next) => {
	let limit = Number(ctx.request.query.limit)
	ctx.response.body = await articleDBLatest(limit)
}

module.exports = {
	'POST /articleAdd': fn_articleAdd,
	'GET /articleDelete/:id': fn_articleDelete,
	'POST /articleUpdateArticle': fn_articleUpdateArticle,
	'POST /articleUpdateComment': fn_articleUpdateComment,
	'GET /articleSearch/:key': fn_articleSeach,
	'GET /articleFindById/:id': fn_articleFind,
	'GET /articleList': fn_articleList,
	'GET /articleCount': fn_articleCount,
	'GET /articleFindByTag/:tag': fn_articleFindByTag,
	'GET /articleGetTag': fn_articleGetTag,
	'GET /articleLatest': fn_articleLatest
}
