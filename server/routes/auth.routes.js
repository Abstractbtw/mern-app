const Router = require("express")
const User = require("../models/User")
const Project = require("../models/Project")
const bcrypt = require("bcryptjs")
const {check, validationResult} = require("express-validator")
const router = new Router()


router.post('/registration',
check('email').isEmail(),
  async (req, res) => {
  try {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({message: `Value is not email`, errors})
    }

    const {email, name, password} = req.body

    if (name.length === 0){
      return res.status(422).json({message: `Fill the name`, errors})
    }

    if (password.length > 12 || password.length < 3){
      return res.status(422).json({message: `Password must be longer than 3 and shorter than 12 symbols`, errors})
    }

    const candidate = await User.findOne({email})
    const role="User"

    if(candidate) {
      return res.status(400).json({message: `User with this email already exist`})
    }

    const hashPassword = await bcrypt.hash(password, 4)
    const user = new User({email, name, password: hashPassword, role})

    await user.save()
    return res.json()

  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})
  }
})



router.post('/login', async (req, res) => {

  try {

    const {email, password} = req.body
    const user = await User.findOne({email})
    if (!user) {
      return res.status(404).json({message: "User not found"})
    }

    const isPassValid = bcrypt.compareSync(password, user.password)
    if (!isPassValid) {
      return res.status(400).json({message: "Invalid password"})
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })


  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})
  }
})



router.post('/addproject',
  [
    check('name', 'Enter name').isLength({min:1}),
    check('desc', 'Enter description').isLength({min:1})
  ], 
  async (req, res) => {

  try {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({message: "Fill all the fields", errors})
    }

    const {name, desc} = req.body
    const from = new Date()
    const startDate = from.getDate() + '.' + (from.getMonth() + 1) + '.' + from.getFullYear()
    const to = ""
    const finishDate = ""
    const status = "opened"

    let including = 0;

    const candidates = await Project.find({}, {_id: 0, name: 1})
    candidates.map((candidate) => {
      if(candidate.name.toLowerCase() === name.toLowerCase()){
        including = 1
      }
    })

    if(including===1) {
      return res.status(400).json({message: `Project ${name} already exist`})
    }

    const project = new Project({name, desc, startDate, from, finishDate, to, status})

    await project.save()
    return res.json()

  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})
  }
})



router.post('/addusers', async (req, res) => {

  try {

    const {name, email} = req.body

    const user = await User.findOne({email: email})
    if (!user) {
      return res.status(404).json({message: "User not found"})
    }

    const candidate = await Project.findOne({name: name, users: {email: email}})

    if(candidate) {
      return res.status(400).json({message: `User ${username} already in project`})
    }

    await Project.findOneAndUpdate({
      name: name
    }, {
      $push: {
        users: {
          name: user.name,
          email: email
        }
      }
    })

    return res.json()


  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})
  }
})



router.post('/deleteuser', async (req, res) => {
  try {

    const {name, username} = req.body

    await Project.findOneAndUpdate({
      name: name
    }, {
      $pull: {
        users: username
      }
    })

    return res.json()

  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})
  }
})



router.post('/addcomment', async (req, res) => {

  try {

    const {name, username, comment} = req.body

    var date = new Date()
    let commenttime = date.getHours() + ':' + date.getMinutes()

    await Project.findOneAndUpdate({
      name: name
    }, {
      $push: {
        comments: {
          user: username,
          comment: comment,
          time: commenttime,
        }
      }
    })

    return res.json()


  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})
  }
})



router.post('/closeproject', async (req, res) => {
  try {

    const {name} = req.body
    const date = new Date()
    const finishDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()

    await Project.findOneAndUpdate({
      name: name
    }, {
      status: "closed",
      to: date,
      finishDate: finishDate
    })

    return res.json()

  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})
  }
})



router.post('/addtime', async (req, res) => {

  try {

    const {name, time, finishDate} = req.body


    await Project.findOneAndUpdate({
      name: name
    }, {
        to: time,
        finishDate: finishDate
    })

    return res.json()


  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})
  }
})



module.exports = router