// const hbs = require('nodemailer-express-handlebars');
const mailConfig = require('../../config/mail');
// const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
// const path = require('path');

const transport = nodemailer.createTransport(mailConfig);

// transport.use('compile', hbs({
//   viewEngine: exphbs(),
//   viewPath: path.resolve(__dirname, '..', 'views', 'emails'),
//   extName: '.hbs',
// }));

module.exports = transport;
