
//set up flash for my warning messages
const flash = require('express-flash');
const session = require('express-session');
const routes = require('./routes');
const greet = require('./greetings')
const express = require("express");
const app = express();

// always require your pg
const pg = require("pg");
const Pool = pg.Pool

const connectionString = process.env.DATABASE_URL || 'postgresql://thembajoseph:themba17307@localhost:5432/greetings-webapp';

const pool = new Pool({
  connectionString
});

var moment = require('moment'); // require
moment().format()


app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

const greetings = greet(pool);
const routesFact = routes(greetings)

const exphbs = require('express-handlebars');

// //get body parser / instantiate
const bodyParser = require('body-parser');


//require the settings bill factory function
// const greet = require("./greetings");

// create an instance for the app, instantiate it.


//instance
// const greetings = greet();

//after ive instantiate my app ,configure , expressJs as handlebars(middleware)
app.engine('handlebars', exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

//make the public folder visible when using express, could be css ,js ,page wanst styled.now can see the middleware
// http://localhost:3011/css/style.css --- to see your css

app.use(express.static('public'));

// // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// // parse application/json
app.use(bodyParser.json());




// get something back on the screen, one route
app.get("/",  routesFact.username);

// help me set my data on the screen and output on the with my counter and my warning messagem

//settings route that is a post as per instructions


app.post("/greetings",  routesFact.secondRoute);

app.get('/greeted',  routesFact.thirdRoute);

app.get('/counter/:name',  routesFact.forthRoute);

app.get("/reset",  routesFact.fifthRoute);

const PORT = process.env.PORT || 3013

app.listen(PORT, function () {
  console.log("app started at port:", PORT);

});





// var stringValue = textElem.value;
    // var userName2 = userNamethemba1730.charAt(0).toUpperCase() + stringValue.slice(1).toLowerCase()
 // const time = req.body.time;
    //  var greetingPerson = await greetings.enterName(userName)


    //  await greetings.getName();

    // var stringValue = textElem.value;
  //   var name = stringValue.charAt(0).toUpperCase() + stringValue.slice(1).toLowerCase();
  //   var numbBack = instance.hasNumbers(name)
  //   var regex = /\d/g;
  //   var regex2 = /[!@#$%^&*(),.;-_'"?":{}|<>]-[ A-Za-z]/g;



  // if (!stringValue.match(regex) && !stringValue.match(regex2)) {


  //  greetings.setName(req.body.userName)
    // !sameCase.match(regex) && !sameCase.match(regex2)
//var regex = /^[a-zA-Z]+$/
//console.log(!sameCase.match(regex2))
//console.log(sameCase)
      // if (userName) {
 // console.log(count);

