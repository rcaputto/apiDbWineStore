const express = require('express');
const app = express();
const path = require('path');
const methodOverride =  require('method-override');
const session = require ("express-session")
const cookieParser = require("cookie-parser")
const mainRoutes = require ("./routes/mainRoutes")
const cors = require('cors');



app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({secret: "secreto"}));
app.use(cookieParser());
app.use(express.json());

app.use(cors());

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

let PORT = process.env.PORT || 3030


app.listen(PORT, () => console.log('Fiesta, Carnaval en ' + PORT));

app.use("/", mainRoutes);


// app.use ("/products/", productRouter)
// app.use ("/user/", userRouter)



// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// // app.use(function(req, res, next) {
// //   next(createError(404));
// // });

// // error handler
// // app.use(function(err, req, res, next) {
// //   // set locals, only providing error in development
// //   res.locals.message = err.message;
// //   res.locals.error = req.app.get('env') === 'development' ? err : {};

// //   // render the error page
// //   res.status(err.status || 500);
// //   res.render('error');
// // });

// module.exports = app;
