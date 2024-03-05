const express = require('express')
const router = express.Router()
const loginController = require('../controllers/login')


const noLoggin = (req, res, next) => {
    if(req.session.isAuth){
        res.redirect(`${req.session.user_id.role}`)
    }else{
        res.render('login.ejs', {info: "noError"})
    }
}

router.get('/', loginController.getRegister)
router.get('/login', noLoggin, loginController.getLogin)
router.post('/checkUsers', loginController.checkUsers)
router.post('/add_User', loginController.addUser)

module.exports = router