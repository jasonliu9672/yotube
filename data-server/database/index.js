
const mongoose = require('mongoose')
const autoIncrementFactory = require('mongoose-sequence')
require('dotenv').config()
mongoose.connect(`mongodb+srv://JasonLiu:${process.env.USER_PASSWORD}@cluster0.zpabx.mongodb.net/yotube?retryWrites=true&w=majority`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => console.log('DB Connected'))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`)
  })
mongoose.Promise = global.Promise
const AutoIncrement = autoIncrementFactory(mongoose)
exports.mongoose = mongoose
exports.autoincrement = AutoIncrement