const config = require('config');
const courses = require('./routes/courses');
const home = require('./routes/home');
const logger = require('./middleware/logger');
const Joi = require('joi');
const express = require('express');
const multer = require('multer');
const upload = multer();
var exphbs  = require('express-handlebars');

const app = express();

const port = process.env.PORT || 3000;


//console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
//console.log(`app : ${app.get('env')}`);

//console.log(`Application Name : ${config.get('name')}`);
//console.log(`Mail Server : ${config.get('mail.host')}`);
//console.log(`Mail Password : ${config.get('mail.password')}`);

//app.set('view engine', 'handlebars');

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
//app.set('views', './views');

app.use(express.json());  // for parsing application/json
app.use(express.urlencoded({ extended: true }));// for parsing application/xwww-
app.use(upload.array());// for parsing multipart/form-data
app.use(express.static('public'));//Access public asset
app.use(logger);

app.use('/api/courses', courses);
app.use('/', home);
/*
if(app.get('env') != 'development'){
    app.use(logger);
}*/








app.listen(3000, () => console.log(`Listening on port ${port}...`));