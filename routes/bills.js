const router = require('express').Router()
const passport = require('passport')

const isAdmin = require('../middleware/isAdmin')

const Bill = require('../models/Bill')
const User = require('../models/User')

router.get('/',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  async (req, res) => {
    try {
      let bills = await Bill.find()
      bills = await Promise.all(bills.map(async bill => {
        let u = await User.findById(bill.user)
        return {
          _id: bill._id,
          user: {
            name: u.name,
            email: u.email
          },
          products: JSON.parse(bill.products)
        }
      }))
      res.json(bills)
    } catch (err) {
      console.log(err)
      res.status(500).json({ server: 'ERROR' })
    }
  })

router.post('/checkout',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const newBill = new Bill({
        user: req.user.id,
        products: JSON.stringify(req.body)
      })
      await newBill.save()
      res.json({ success: true })
    } catch (err) {
      res.status(500).json({ server: 'ERROR' })
    }
  })

module.exports = router