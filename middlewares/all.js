const checkUser = (req, res, next) => {
  req.session.userName || req.session.userId ? next() : res.redirect('/')
}

const deepCheckUser = (req, res, next) => {
  +req.session.userId === +req.params.id ? next() : res.redirect('/error')
}

const welcomeUser = (req, res, next) => {
  res.locals.userId = req.session?.userId
  if (req.session) {
    res.locals.userName = req.session.userName
    res.locals.userEmail = req.session.userEmail
  }
  next()
}

module.exports = { checkUser, deepCheckUser, welcomeUser }
