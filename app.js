require('dotenv').config()
const express = require('express')
const path = require('path')

const cookieParser = require('cookie-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)


const PORT = 3042
const indexRouter = require('./routes/index')
const authRouter = require('./routes/authRouter')
const profileRouter = require('./routes/profileRouter')
const categoryRouter = require('./routes/categoryRouter')
const productRouter = require('./routes/productsRouter')
const { welcomeUser } = require('./middlewares/all')

const app = express()
app.set('view engine', 'hbs')
app.set('views', path.join(process.env.PWD, 'views'))
app.use(express.static(path.join(process.env.PWD, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({
  secret: 'banana',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
  name: 'Denis',
  store: new FileStore(),
}))


app.use(welcomeUser)
app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/profile', profileRouter)
app.use('/category', categoryRouter)
app.use('/products', productRouter)



app.listen(PORT, () => {
  console.log('Ты найдешь меня на ' + PORT + ' порту :)')
})







