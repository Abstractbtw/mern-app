const {Schema, model, ObjectId} = require("mongoose")

const Project = new Schema({
  name: {type: String, required: true},
  desc: {type: String, required: true},
  users: [String],
  comments: [{
    user: String,
    comment: String
  }],
  from: {type: String},
  to: {type: String}
})

module.exports = model('Project', Project)