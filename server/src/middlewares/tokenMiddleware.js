const JWTService = require('../services/jwtService')

module.exports.checkAccessToken =async (req,res,next) =>{
try{ 
const {headers: {authorization}} = req;
const [, token] = authorization.split(' ')
req.tokenData = await JWTService.verifyAccessTokens(token)
next()
}catch(err){
    next(err)
}
}

module.exports.checkRefreshToken = async (req,res,next) =>{
try{ 
const {body: {refreshToken}} = req
req.tokenData = await JWTService.verifyRefreshTokens(refreshToken)
next()
}catch(err){
    next(err)
} 
}