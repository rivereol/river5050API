const mongoose = require('./index')
const Schema = mongoose.Schema;

let WebCommentSchema = new Schema({
	name: String,
	content: String,
	comment: {
		type: Array,
		default: []
	}
}, {timestamps: true})

let WebCommentModel = mongoose.model('WebCommentModel', WebCommentSchema)

module.exports = WebCommentModel