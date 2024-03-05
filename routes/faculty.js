const express = require('express')
const router = express.Router()
const facultyController = require('../controllers/faculty')
const isAuth = (req, res, next) => {
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/login', {info: "error"})
    }
}

router.get('/',isAuth, facultyController.getHome)

router.get('/scanner', isAuth,facultyController.getScanner)
router.get('/show_attendance',isAuth, facultyController.show_attendance)
router.get('/update_attendance',isAuth, facultyController.update_attendance)
router.get('/delete_attendance',isAuth, facultyController.delete_attendance)
// router.get('/dummy', facultyController.dummy)

router.post('/showAttendance',isAuth, facultyController.showAttendance)
router.post('deleteAttendance',isAuth, facultyController.deleteAttendance)
router.post('/addEnrollmentNo',isAuth, facultyController.addEnrollmentNo)
router.post('/manually_add_user',isAuth, facultyController.manually_add_user)
router.post('/updateAttendance',isAuth, facultyController.updateAttendance)

router.post('/logout', isAuth, facultyController.logout)


module.exports = router