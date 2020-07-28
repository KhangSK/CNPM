const router = require('express').Router()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const { registerValidation, loginValidation } = require('../validation/auth')

router.post('/register', async (req, res) => {
  try {
    // validation data
    const { errors, isValid } = registerValidation(req.body)
    if (!isValid) {
      console.log(errors)
      return res.status(400).json(errors)
    }

    const { name, email, password } = req.body
    const emailExists = await User.findOne({ email: email })
    if (emailExists) {
      return res.status(400).json({ email: 'Email is exists' })
    }

    // hash password
    const salt = await bcryptjs.genSalt(10)
    const hash = await bcryptjs.hash(password, salt)

    const newUser = new User({
      name: name,
      email: email,
      password: hash
    })
    await newUser.save()
    res.json({ success: true })
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
})
//check tk
router.post('/login', async (req, res) => {
  try {
    const { errors, isValid } = loginValidation(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.status(400).json({ email: 'Email not found' })
    }
    const isMatch = await bcryptjs.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ email: 'Password is wrong' })
    }

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }

    const token = await jwt.sign(payload, 'secret_key', { expiresIn: '24h' })
    res.json({ success: true, token: `Bearer ${token}` })
  } catch (error) {
    return res.status(400).json(error)
  }
})

module.exports = router