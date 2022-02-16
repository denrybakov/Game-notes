const router = require('express').Router()
const { Product, Category } = require('../db/models')
const { checkUser } = require('../middlewares/all')

router.get('/', checkUser, async (req, res) => {
  // сам не в восторге от такого кода
  const userCategory = await Category.findAll({ where: { user_id: req.session.userId } })
  const arrId = userCategory.map(item => item.id)
  const allProducts = await Product.findAll({ where: { category_id: arrId } }, { row: true })
  res.render('pages/allProducts', { products: allProducts })
})

router.post('/:id', checkUser, async (req, res) => {
  const { name } = req.body
  try {
    const newProduct = await Product.create({ name, category_id: req.params.id })
    res.json(newProduct)
  } catch (err) {
    res.sendStatus(401)
  }
})

router.delete('/:id', checkUser, async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } })
    res.sendStatus(200)
  } catch (err) {
    res.sendStatus(401)
  }
})

module.exports = router 
