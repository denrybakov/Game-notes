const router = require('express').Router()
const { User } = require('../db/models')
const sha256 = require('sha256')

router.get('/', (req, res) => {
  req.session.userId ? res.redirect('/profile') : res.render('pages/signin')
})

router.get('/reg', (req, res) => {
  req.session.userId ? res.redirect('/profile') : res.render('pages/signup')
})

router.post('/', async (req, res) => {
  // вход
  const { email, password } = req.body
  try {
    const user = await User.findOne({ where: { email } })
    if (user.email === email && user.password === sha256(password)) {
      req.session.userId = user.id
      req.session.userName = user.name
      req.session.userEmail = user.email
      res.json({ userId: user.id })
    }
  } catch (err) {
    res.sendStatus(401)
  }
})

router.post('/reg', async (req, res) => {
  // регистрация
  const { name, email } = req.body
  const password = sha256(req.body.password)
  const dbUser = await User.findOne({ where: { email } })
  try {
    if (!dbUser) {
      const newUser = await User.create({ name, email, password })
      req.session.userId = newUser.id
      req.session.userName = newUser.name
      req.session.userEmail = newUser.email
      res.json({ userId: newUser.id })
    }
  } catch (err) {
    res.sendStatus(401)
  }
})

module.exports = router 
