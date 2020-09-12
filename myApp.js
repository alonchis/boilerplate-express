var bodyParser = require('body-parser');
var express = require('express');
var app = express();

// --> 7)  Mount the Logger middleware here
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !
app.use(function middleware(req, res, next) {
  express.static(__dirname + "/public");
  
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
  });

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({ extended: false }));


/** 1) Meet the node console. */
console.log("Hello World");

// /** 2) A first working Express Server 
// app.get('/', function(req, res) {
  // res.send('Hello Express');
// })
// */

/** 3) Serve an HTML file */
app.get('/', function(req, res) {
  absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
});

/** 4) Serve static assets  */
// app.use(express.static(__dirname + "/public"));

/** 5) serve JSON on a specific route */
// app.get("/json", (req, res) => {
//   //var obj = new Object();
//   //obj.message = "Hello json";
//   res.json({message: "Hello json"});
// });


/** 6) Use the .env file to configure the app */
app.get("/json", function(req, res) {
  var obj = {message: "Hello json"};
  console.log(process.env.MESSAGE_STYLE.toUpperCase());
  if (process.env.MESSAGE_STYLE == "uppercase") {
    obj.message = obj.message.toUpperCase();
  }
  res.json(obj);
});
// /** 8) Chaining middleware. A Time server */
app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  var json = {time: req.time};
  res.send(json);
});

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo', function(req, res) {
  var obj = {echo: req.params.word};
  res.send(obj);
});


/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.route('/name')
  .get(function(req, res) {
    var obj = {name: `${req.query.first} ${req.query.last}`};
    res.send(obj);
  })
  .post(function(req, res) {
  
    var obj = {name: `${req.body.first} ${req.body.last}`};
    res.send(obj);
  });

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;

