const jwt = require('jsonwebtoken')
const expiresIn = '60m'

function parseBearer(bearer, headers) {
  let token = null
  if (bearer.startsWith('Bearer ')) {
    token = bearer.slice(7, bearer.length)
    
  }
  const decoded = jwt.verify(token, prepareSecret(headers))
  return decoded
}

function prepareToken(data, headers) {
  return jwt.sign(data, prepareSecret(headers), { expiresIn })
}

function prepareSecret(headers) {
  return process.env.tokenKey + headers['user-agent'] + headers['accept-language']
}

module.exports = { parseBearer, prepareToken }
