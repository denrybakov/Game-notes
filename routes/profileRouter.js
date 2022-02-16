const router = require('express').Router()
const { Category, Product } = require('../db/models')
const { checkUser } = require('../middlewares/all')

router.get('/', checkUser, async (req, res) => {
  const allCategory = await Category.findAll({ where: { user_id: req.session.userId } })
  const arrId = allCategory.map(item => item.id)
  const allProducts = await Product.findAll({ where: { category_id: arrId } }, { row: true })
  res.render('pages/profile', { lengthProducts: allProducts.length, lengthCategory: allCategory.length })
})

router.get('/:id', checkUser, (req, res) => {
  res.redirect(`/profile`)
})

module.exports = router 
