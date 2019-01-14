const Koa = require('koa');
// const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const controller = require('./controller.js');
const dbConnect = require('./model/db.js');
const app = new Koa();
dbConnect();

app.use(async (ctx, next) => {
	console.log(`Progress ${ctx.request.method} ${ctx.request.url}`)
	await next()
})

app.use(bodyParser());
app.use(controller());
app.listen(3000);
console.log('app starts at port 3000');