const dbs = require('../models/dbs')
const bcrypt = require('bcryptjs')

// let attendance = 'table_5'
let users = 'user'
// let subjects = 'subjects'

module.exports = {
    getBuilding: (req,res)=>{
        res.render('buildings.ejs')
    },


    getRegister: (req,res) => {
        res.render('register.ejs', {info: "noError"})
    },

    addUser: async (req, res) => {
        const {username, email, password} = req.body
        console.log({username, email, password})

        let user = await dbs.queries([`select * from ${users} where email = '${email}'`])
        console.log(user[0][0])
        if (user[0][0] !== undefined) {
            if(user[0][0].email == email){
                return res.redirect('/')
            }
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        await dbs.queries([`insert into ${users} values('${username}', '${email}', '${hashedPassword}', '${req.body.role}');`])

        // res.redirect('/login')
        res.redirect("/login")



        // await dbs.queries([`insert into ${users} values('${req.body.username}', '${req.body.email}', '${req.body.password}', '${req.body.role}');`])
    },


    getLogin: (req,res) => {
        res.render('login.ejs', { info: "noError" })
    },

    checkUsers: async(req,res) => {
        const {email, password} = req.body
        let user = await dbs.queries([`select * from ${users} where email = '${email}'`])
        console.log(user[0][0])

        if(user[0][0] == undefined){
            return res.render('/login', {info: "error"})
        }
        
        const isMatch = await bcrypt.compare(password, user[0][0].password)
        console.log(isMatch)

        if(!isMatch){
            return res.render('/login', {info: "error"})
        }

        req.session.isAuth = true;
        req.session.user_id = {
            "user_name": user[0][0].user_name,
            "role": user[0][0].role
        }

        if (req.body.role == "hod") {
            res.redirect("/hod")
        }
        else if(req.body.role == "faculty"){
            res.redirect("/faculty")
        }
    },
}