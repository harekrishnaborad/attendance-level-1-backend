const express = require('express')
const app = express()
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcryptjs')
const dbs = require('./models/dbs')
const PORT = 2121
const loginRoutes = require('./routes/login')
const hodRoutes = require('./routes/hod')
const facultyRoutes = require('./routes/faculty')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


const options = {
	host: '127.0.0.1',
	// port: 3306,
	user: 'root',
	password: 'codeM_0007',
	database: 'student',
    schema: {
		tableName: 'sessions',
		columnNames: {
			session_id: 'session_id',
			expires: 'expires',
			data: 'data'
		}
	}
};

const sessionStore = new MySQLStore(options);

app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));

// Optionally use onReady() to get a promise that resolves when store is ready.
sessionStore.onReady().then(() => {
	// MySQL session store ready for use.
	console.log('MySQLStore ready');
}).catch(error => {
	// Something went wrong.
	console.error(error);
});


app.use('/', loginRoutes)
app.use('/hod', hodRoutes)
app.use('/faculty', facultyRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})