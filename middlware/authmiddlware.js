const jwt = require('jsonwebtoken')
const AsyncHandler = require('express-async-handler')
const User =  require ('../models/user')

const protect = AsyncHandler(async(req,res,next) =>{
    let token 

    if(req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer'))
        {
            try {
                token =req.headers.authorization.split(' ')[1]

                const decoded = jwt.verify(token,process.env.JWT_SECRET)

                req.user = await User.findById(decoded.id).select('-motdepasse')
            } catch (error) {
                console.error(error)
                res.status(401)
                throw new Error('Not authorized, token failed')
            }
        }
    if(!token){
        res.status(401)
        throw new Error('Not authorized ,no token')
        }
    next()
})
const ProprietaireDeStade = (req,res,next) =>{
    if(req.user &&req.user.isProprietaireDestade){
        next()
    } else {
        res.status(401)
        throw new Error('not authorized as an ProprietaireDeStade')
    }
}
/*const JoueurUser = (req,res,next) =>{
    if(req.user &&req.user.isJoueur){
        next()
    } else {
        res.status(401)
        throw new Error('not authorized as an Joueur')
    }
}*/
module.exports= {protect,ProprietaireDeStade}