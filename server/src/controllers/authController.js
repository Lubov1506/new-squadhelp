const { createError } = require('http-errors')
const JWTService = require('../services/jwtService')
const {User, RefreshToken} = require('../models')
const {
  ACCESS_TOKEN_TIME,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_TIME,
  REFRESH_TOKEN_SECRET,
  MAX_DEVICE_AMOUNT
} = require('../constants')

const signJWT = promisify(jwt.sign)

module.exports.signIn = async (req, res, next) => {
  try {
    const {
      body: { email, password }
    } = req
    const user = await User.findOne({
      where: { email }
    })
    if (user && user.comparePassword(password)) {

     const tokenPair = await JWTService.createTokenPair(user)

      if ((await user.countRefreshTokens() )>= MAX_DEVICE_AMOUNT){
        const [oldestToken] = await user.getRefreshTokens({
          order: [('updatedAt', 'ASC')]
        })
        await oldestToken.update({
          value: refreshToken
        })
      }else{
        user.createRefreshToken({
          value: refreshToken
        })
      }

      user.createRefreshToken({
        value: refreshToken
      })

      res.send({
        data: {
          user,
          tokens: {
            access: accessToken,
            refresh: refreshToken
          }
        }
      })
    } else {
      next(createError(403, 'Invalid credentials'))
    }
  } catch (error) {
    next(error)
  }
}
module.exports.signUp = async (req, res, next) => {
  try {
    const {body} = req
    const user = await User.create(body)

    if (user) {
      const tokenPair = await JWTService.createTokenPair(user)

      user.createRefreshToken({
        value: refreshToken
      })

      res.send({
        data: {
          user,
          tokens: {
            access: accessToken,
            refresh: refreshToken
          }
        }
      })
    } else {
      next(createError(406, 'Can`t create user'))
    }
  } catch (error) {
    next(error)
  }
}

module.exports.refresh = async (req, res, next) => {
  try {
    const {body: {refreshToken}} = req;
    const refreshTokenInstance = await RefreshToken.findOne({
      where: {value: refreshToken}
    })

    const user = await refreshTokenInstance.getUser();
    const tokenPair = await JWTService.createTokenPair(user)
    
  await refreshTokenInstance.update({
    value: newRefreshToken
  })

  res.send({
    data: {
      user,
      tokens: {
        access: newAccessToken,
        refresh: newRefreshToken
      }
    }
  })

  } catch (error) {
    next(error)
  }
}
