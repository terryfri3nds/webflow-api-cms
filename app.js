//Required
require('dotenv').config();
const myCache = require( "./models/cache" );

//var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//var csrf = require('csurf');
var cors = require('cors')
const session = require("express-session");
//const ExpressCache = require('express-cache-middleware')
//const cacheManager = require('cache-manager')

//const cacheMiddleware = new ExpressCache(
//  cacheManager.caching({
//      store: 'memory', max: 10000, ttl: 3600
//  })
//)


const jwt = require("jsonwebtoken");
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
var indexRouter = require('./routes/index');
var collectionApiRouter = require('./routes/collections'); 

var responseJSON = require('./models/responses/response');


//const csrfMiddleware = csrf({cookie: true});

const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Webflow CMS API",
      version: "1.0.0"
    },
    servers: [
      {
        url: '/'
      }
    ]
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`]
}


var app = express();
/*
app.set("secretKey", "fefe23901jkds98nwe");
app.use(
  session({
    cookie: { maxAge: 240 * 60 * 60 * 1000 },
    store,
    saveUninitialized: true,
    resave: true,
    secret: "api!!!_1987",
  })
);
*/


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//habilito el caché
//cacheMiddleware.attach(app)

app.use('/api/:collection', verifyTokenNonExpire, collectionApiRouter);
//app.use('/api/podcasts', verifyTokenNonExpire, collectionApiRouter);
//app.use('/api/blogs', verifyTokenNonExpire, collectionApiRouter);
//app.use('/old-api/sessions', verifyTokenNonExpire, sessionApiRouter);
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));
app.use('/purge', function(req, res){

  console.log("purge")
  
    myCache.flushAll();

    return responseJSON(res, 200, 'success', {}, 'Cache purged');


});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

function verifyTokenNonExpire(req, res, next) {
  const { token } = req.headers;

  if (!token)
    return responseJSON(res, 401, 'Unauthorized', '', 'Access token is missing or invalid');

  if (token !== process.env.TOKEN_NONEXPIRE)
    return responseJSON(res, 401, 'Unauthorized', '', 'Access token is missing or invalid');

  next();
}


// catch 404 and forward to error handler
//app.use(function (req, res, next) {
 // next(createError(404));
//});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  var responseData;

  if (err.name === 'JsonSchemaValidation') {
    // Log the error however you please
    console.log(err.message);
    // logs "express-jsonschema: Invalid data found"

    // Format the response body however you want
    responseData = {
      jsonSchemaValidation: true,
      validations: err.validations  // All of your validation information
    };

    // Take into account the content type if your app serves various content types
    if (req.xhr || req.get('Content-Type') === 'application/json') {
      return responseJSON(res, err.status || 500, 'error', responseData, 'Bad Request');
    } else {
      // If this is an html request then you should probably have
      // some type of Bad Request html template to respond with
      return responseJSON(res, 400, 'Bad Request', responseData, 'error');

    }
  }
  else {
    console.log("error",  err)
    return responseJSON(res, 400, 'Bad Request', err, 'error');
  }

});

module.exports = app;
