import mongoose from 'mongoose'
import 'dotenv/config'

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env
console.log('teste: ' + DB_USER);
mongoose.connect(
  `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
  {
    useNewUrlParser: true,
  }
)

mongoose.connection.on('error', () => console.error('connection error:'))
mongoose.connection.once('open', () => console.log('database connected'))
