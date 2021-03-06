const { createError } = require('http-errors')
const AuthService = require('../services/authService')
const {User, RefreshToken} = require('../models')

module.exports.signIn = async (req, res, next) => {
  try {
    const {
      body: { email, password }
    } = req
    // find user
    const user = await User.findOne({
      where: { email }
    })
    // compare password
    if (user && user.comparePassword(password)) {
    // create token pair
    const data = await AuthService.createSession(user)
    // send token to user
    res.send({data})
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
      const data = await AuthService.createSession(user)
      res.send({data})
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
    const data = await AuthService.refreshSession(refreshTokenInstance)
    res.send({data})
  } catch (error) {
    next(error)
  }
}
