const Router = require("express")
const User = require("../models/User")
const Project = require("../models/Project")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")
const {check, validationResult} = require("express-validator")
const router = new Router()



router.post('/registration', 
  [
    check('password', 'Password must be longer than 3 and shorter than 12 symbols').isLength({min:3, max:12})
  ],
  async (req, res) => {

  try {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({message: "Incorrect request", errors})
    }

    const {name, password} = req.body

    const candidate = await User.findOne({name})

    if(candidate) {
      return res.status(400).json({message: `User ${name} already exist`})
    }

    const hashPassword = await bcrypt.hash(password, 4)
    const user = new User({name, password: hashPassword})

    await user.save()
    return res.json({message: "User was created"})

  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})
  }
})



router.post('/login', async (req, res) => {

  try {

    const {name, password} = req.body
    const user = await User.findOne({name})
    if (!user) {
      return res.status(404).json({message: "User not found"})
    }

    const isPassValid = bcrypt.compareSync(password, user.password)
    if (!isPassValid) {
      return res.status(400).json({message: "Invalid password"})
    }

    const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name
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

    const candidate = await Project.findOne({name})

    if(candidate) {
      return res.status(400).json({message: `Project ${name} already exist`})
    }

    const project = new Project({name, desc})

    await project.save()
    return res.json({message: "Project was created"})

  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})
  }
})



router.post('/addusers', async (req, res) => {

  try {

    const {name, username} = req.body

    const user = await User.findOne({name: username})
    if (!user) {
      return res.status(404).json({message: "User not found"})
    }

    const candidate = await Project.findOne({name: name, users: username})

    if(candidate) {
      return res.status(400).json({message: `User ${username} already in project`})
    }

    await Project.findOneAndUpdate({
      name: name
    }, {
      $push: {
        users: username
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

    await Project.findOneAndUpdate({
      name: name
    }, {
      $push: {
        comments: {
          user: username,
          comment: comment
        }
      }
    })

    return res.json()


  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})
  }
})



router.post('/deleteproject', async (req, res) => {
  try {

    const {name} = req.body

    await Project.deleteOne({
      name: name
    })

    return res.json()

  } catch (e) {
    console.log(e)
    res.send({message: "Server error"})
  }
})



module.exports = router