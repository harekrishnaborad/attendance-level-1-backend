const express = require('express')
const router = express.Router()
const loginController = require('../controllers/login')


const noLoggin = (req, res, next) => {
    if(req.session.isAuth){
        res.redirect(`/${req.session.user_id.role}`)
    }else{
        next()
    }
}

router.get('/', noLoggin, loginController.getRegister)
router.get('/login', noLoggin, loginController.getLogin)
router.post('/checkUsers', loginController.checkUsers)
router.post('/add_User', loginController.addUser)
router.get('/redirect',loginController.redirect_user)
router.get('/redirect_user',loginController.redirect_user_2)


module.exports = router