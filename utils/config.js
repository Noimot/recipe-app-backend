const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })

const port = process.env.PORT || 3000

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

module.exports = {
  DB,
  port,
}
