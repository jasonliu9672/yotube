const bcrypt = require('bcryptjs')
const mongoose = require('../database/index.js').mongoose
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    trim: true,
    minlength: 3
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  streamId: {
    type: String
  },
  picture: {
    type: String
  }
})

UserSchema.pre('save', function (next) {
  var user = this
  if (!user.isModified('password')) { return next() }
  bcrypt.hash(user.password, 10).then((hashedpassword) => {
    user.password = hashedpassword
    next()
  })
})
UserSchema.statics.comparePassword = function (candidatePassword, userPassword) {
  console.log(candidatePassword, userPassword)
  bcrypt.compare(candidatePassword, userPassword, function (err, isMatch) {
    if (err) { throw (err) }
    return isMatch
  })
}
const User = mongoose.model('User', UserSchema)

module.exports = User