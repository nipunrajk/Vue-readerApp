const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mysql = require('mysql2')

const { sequelize } = require('./models')
const config = require('./config/config')

const app = express()
app.use(morgan('combine'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

//database
const db = require('./models/index')

const connection = mysql.createConnection({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB,
})

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack)
    return
  }

  console.log(`Connected to the database ${config.DB} as user ${config.USER}.`)
  // connection.query(`SHOW TABLES`, (error, results) => {
  //   if (error) {
  //     console.error('Error querying the database: ' + error.stack)
  //     return
  //   }

  //   console.log('Tables in the database:', results)
  // })
})

db.sequelize.sync({ force: false }).then(() => {
  app.listen(config.port)
  console.log(`server started on port ${config.port}`)
})
