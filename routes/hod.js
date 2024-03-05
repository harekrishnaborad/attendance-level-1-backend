const express = require('express')
const router = express.Router()
const hodController = require('../controllers/hod')
const facultyController = require('../controllers/faculty')


const isAuth = (req, res, next) => {
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/login')
    }
}

router.get('/',isAuth, hodController.getHome)

router.get('/scanner', isAuth,facultyController.getScanner)
router.get('/show_attendance',isAuth, facultyController.show_attendance)
router.get('/update_attendance',isAuth, facultyController.update_attendance)
router.get('/delete_attendance',isAuth, facultyController.delete_attendance)
// router.get('/dummy', facultyController.dummy)

router.post('/showAttendance',isAuth, facultyController.showAttendance)
router.post('/updateAttendance',isAuth, facultyController.updateAttendance)
router.post('deleteAttendance',isAuth, facultyController.deleteAttendance)
router.post('/addEnrollmentNo',isAuth, facultyController.addEnrollmentNo)
router.post('/manually_add_user',isAuth, facultyController.manually_add_user)



router.get('/create_subject',isAuth, hodController.create_subject)
router.get('/show_subject',isAuth, hodController.show_subject)
router.get('/update_subject',isAuth, hodController.update_subject)
router.get('/delete_subject',isAuth, hodController.delete_subject)


router.post('/createSubject',isAuth, hodController.createSubject)
router.post('/updateSubject',isAuth, hodController.updateSubject)
router.post('/deleteSubject',isAuth, hodController.deleteSubject)
router.post('/logout', isAuth, hodController.logout)

module.exports = router