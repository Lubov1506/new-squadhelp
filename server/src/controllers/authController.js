
const {createError} = require('http-errors');
const {User} = require('../models/User');

module.exports.signIn = async(req,res,next) => {
    try{
        const {body: {email, password}} = req;

        const user = await User.findOne({
            where: {email}
        })
        if(user && user.comparePassword(password)) {

        }else{
        next(createError(403, 'Invalid credentials'))
        }
    }catch(error){
        next(error)
    }


}
module.exports.signUp = async(req,res,next) => {
    try{
        const {body} = req;
        const user = await User.create(body)
        
    }catch(error){
        next(error)
    }
}
module.exports.refresh = async(req,res,next) => {
    try{

    }catch(error){
        next(error)
    }
}