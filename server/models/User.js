const {Schema, model, ObjectId} = require("mongoose")

const User = new Schema({
  name: {type: String, required: true},
  password: {type: String, required: true},
  files: [{type: ObjectId, ref:'File'}]
})

module.exports = model('User', User)