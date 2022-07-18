const {Schema, model, ObjectId} = require("mongoose")

const User = new Schema({
  name: {type: String, required: true},
  password: {type: String, required: true},
  role: {type: String}
})

module.exports = model('User', User)