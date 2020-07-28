const router = require('express').Router()
const passport = require('passport')
const multer = require('multer')//package upload images

const upload = multer({ dest: 'public/images/' })

const isAdmin = require('../middleware/isAdmin')

const Product = require('../models/Product')
const Stall = require('../models/Stall')
const { route } = require('./bills');
const { ObjectId } = require('mongoose')

// get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ server: 'ERROR' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const products = await Product
      .findByIdAndRemove(req.params.id)
      .then(() => 'Item deleted')
  } catch (err) {
    res.status(500).json({ server: 'ERR' })
  }
})

router.post('/',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  upload.single('photo'),
  async (req, res) => {
    try {
      let { name, price, stall } = req.body
      let newProduct = new Product({
        name,
        price,
        stall,
        image: req.file.filename,
      })
      console.log(newProduct)
      await newProduct.save()
      res.json(newProduct)
    } catch (err) {
      console.log(err)
      res.status(500).json({ server: 'ERROR' })
    }
  })

router.get('/stalls', async (req, res) => {
  try {
    const stalls = await Stall.find()

    res.json(stalls)
  } catch (err) {
    res.status(500).json({ server: 'ERROR' })
  }
}
)

router.post('/stalls',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  upload.single('photo'),
  async (req, res) => {
    try {
      let newStall = new Stall({
        name: req.body.name,
        image: req.file.filename,
      })
      await newStall.save()
      res.json(newStall)
    } catch (err) {
      res.status(500).json({ server: 'ERROR' })
    }
  })

module.exports = router