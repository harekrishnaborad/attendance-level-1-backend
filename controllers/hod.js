const dbs = require('../models/dbs')

// let attendance = 'table_5'
// let users = 'users'
let subjects = 'subjects'

module.exports = {
    getHome: (request,response)=>{
        response.render('hod_home.ejs', {user_id: request.session.user_id})
    },

    create_subject: (request,response)=>{
        response.render('create_subjects.ejs', { message: "data" ,user_id: request.session.user_id,})
    },

    update_subject: (request,response)=>{
        response.render('update_subject.ejs', { message: "data" ,user_id: request.session.user_id,})
    },

    delete_subject: (request,response)=>{
        response.render('delete_subject.ejs', { message: "data" ,user_id: request.session.user_id,})
    },

    show_subject: async (request, response) => {
        let data = await dbs.queries([`select * from ${subjects};`])
        console.log(data)
        response.render('show_subjects.ejs', { result_subjects: data[0] ,user_id: request.session.user_id,})
    },

    createSubject: async (request, response) => {
        let data = await dbs.queries([`insert into ${subjects} values('${request.body.subject_name}');`, `select distinct * from users;`])
        response.render('subject_created.ejs', { subject_name: request.body.subject_name ,user_id: request.session.user_id,})
    },

    updateSubject: async (request, response) => {
        let data = await dbs.queries([`update ${subjects} set name = '${request.body.new_name}' where name = '${request.body.previous_name}';`, 'select * from subjects'])
        response.render('show_subjects.ejs', { result_subjects: data[1][0] ,user_id: request.session.user_id,})
    },

    deleteSubject: async (request, response) => {
        let data = await dbs.queries([`delete from ${subjects} where name = '${request.body.subject_name}';`, 'select * from subjects', `select distinct * from users;`])
        response.redirect("/show_subject")
    },
    logout: (request, response) => {
        request.session.destroy((err) => {
            if(err) throw err;
            response.redirect('/')
        })
    }
}


