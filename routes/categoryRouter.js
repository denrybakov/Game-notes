const router = require('express').Router()
const { Category, Product } = require('../db/models')
const { checkUser } = require('../middlewares/all')

router.get('/', checkUser, async (req, res) => {
  const allCategory = await Category.findAll({ where: { user_id: req.session.userId } })
  res.render('pages/category', { categories: allCategory, lengthCategory: allCategory.length })
})

router.get('/:id', checkUser, async (req, res) => {
  const products = await Product.findAll({ where: { category_id: req.params.id } })
  const category = await Category.findOne({ where: { id: req.params.id } })
  res.render('pages/categoryId', { category, products })
})

router.post('/', async (req, res) => {
  const { name } = req.body
  const { userId } = req.session
  try {
    const category = await Category.create({ name, user_id: userId })
    res.json(category)
  } catch (err) {
    res.sendStatus(401)
  }
})

router.put('/:id', async (req, res) => {
  const { name } = req.body
  try {
    const result = await Category.update({ name, user_id: req.session.userId }, { where: { id: req.params.id } })
    res.sendStatus(201)
  } catch (err) {
    res.sendStatus(401)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await Category.destroy({ where: { id: req.params.id } })
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(401)
  }
})

module.exports = router 
