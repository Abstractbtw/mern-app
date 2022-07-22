const {Schema, model, ObjectId} = require("mongoose")

const Project = new Schema({
  name: {type: String, required: true},
  desc: {type: String, required: true},
  users: [String],
  comments: [{
    user: String,
    comment: String,
    time: String,
  }],
  from: {type: Date},
  startDate: {type: String},
  to: {type: Date},
  finishDate: {type: String},
  status: {type: String}
})

module.exports = model('Project', Project)