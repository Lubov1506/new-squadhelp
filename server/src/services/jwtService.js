const { promisify } = require('utils');
const jwt = require('jsonwebtoken')
const {
    ACCESS_TOKEN_TIME,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_TIME,
    REFRESH_TOKEN_SECRET
  } = require('../constants')

const signJWT = promisify(jwt.sign)
const verifyJWT = promisify(jwt.verify)

const tokenConfig = {
    access: {
        secret: ACCESS_TOKEN_SECRET,
        time: ACCESS_TOKEN_TIME
    },
    refresh: {
        secret: REFRESH_TOKEN_SECRET,
        time: REFRESH_TOKEN_TIME
    }
}

const cresteToken = (payload, {time, secret}) =>{
    return signJWT({
        userId: payload.id,
        email: payload.email,
        role: payload.role
      }, secret, {
        expiresIn: time
      })
}

const verifyToken = (token, {secret}) => verifyJWT(tokrn, secret)
module.exports.createTokenPair = () =>{
  return {
    access: await cresteToken(payload, tokenConfig.access),
    refresh: await cresteToken(payload, tokenConfig.refresh)
  }
}
module.exports.verifyAccessTokens = (token) =>verifyToken(token, tokenConfig.access)
module.exports.verifyRefreshTokens = (token) =>verifyToken(token, tokenConfig.refresh)