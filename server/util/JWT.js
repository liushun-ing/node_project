const jsonwebtoken = require('jsonwebtoken')

const secret = 'liushun'
const JWT = {
  generate(value, expire) {
    return jsonwebtoken.sign(value, secret, {
      expiresIn: expire
    })
  },
  verify(token) {
    try {
      return jsonwebtoken.verify(token, secret)
    } catch (error) {
      return false
    }
  }
}

module.exports = JWT