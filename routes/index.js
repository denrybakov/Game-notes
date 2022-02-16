const router = require('express').Router()

router.get('/', (req, res) => {
  if (req.session.userId) {
    res.redirect('/profile')
  } else {
    res.render('pages/index')
  }

})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

module.exports = router
