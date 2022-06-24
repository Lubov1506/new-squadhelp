const { createError } = require('http-errors')
const { promisify } = require('utils')
const { User } = require('../models/User')
const {RefreshToken} = require('../models/refreshToken')
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

      const accessToken = signJWT({
          userId: user.id,
          email: user.email,
          role: user.role
        },
        ACCESS_TOKEN_SECRET, {
          expiresIn: ACCESS_TOKEN_TIME
        }
      )

      const refreshToken = signJWT({  
        userId: user.id,
        email: user.email,
        role: user.role
      }, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_TIME
      })

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
      
      const accessToken = signJWT({
          userId: user.id,
          email: user.email,
          role: user.role
        },
        ACCESS_TOKEN_SECRET,{
          expiresIn: ACCESS_TOKEN_TIME
        }
      )

      const refreshToken = signJWT({  
        userId: user.id,
        email: user.email,
        role: user.role
      }, REFRESH_TOKEN_SECRET, {
        expiresIn: REFRESH_TOKEN_TIME
      })

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

    const newAccessToken = signJWT({
      userId: user.id,
      email: user.email,
      role: user.role
    },
    ACCESS_TOKEN_SECRET,{
      expiresIn: ACCESS_TOKEN_TIME
    }
  )

  const newRefreshToken = signJWT({  
    userId: user.id,
    email: user.email,
    role: user.role
  }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_TIME
  })

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
