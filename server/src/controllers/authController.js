const { createError } = require('http-errors')
const { promisify } = require('utils')
const { User } = require('../models/User')
const {
  ACCESS_TOKEN_TIME,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_TIME,
  REFRESH_TOKEN_SECRET
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
      const accessToken = signJWT(
        {
          userId: user.id,
          email: user.email,
          role: user.role
        },
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: ACCESS_TOKEN_TIME
        }
      )

      const refreshToken = signJWT({}, REFRESH_TOKEN_SECRET, {
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
      next(createError(403, 'Invalid credentials'))
    }
  } catch (error) {
    next(error)
  }
}
module.exports.signUp = async (req, res, next) => {
  try {
    const { body } = req
    const user = await User.create(body)
  } catch (error) {
    next(error)
  }
}
module.exports.refresh = async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
}
