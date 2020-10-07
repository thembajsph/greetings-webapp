
//set up flash for my warning messages
const flash = require('express-flash');
const session = require('express-session');
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
app.get("/", async function (req, res) {

  // No default engine was specified and no extension was provided(Error: for me to use render,)
  //install, npm install --save express-handlebars
  // npm install --save body-parser(forms to work)


  //flash warning message
  req.flash('info',);


  const greetedNames = await pool.query('select id, name,count as greets, time as "timeOfGreets" from greetings');

    let counterVal = await greetings.overallCounter()

  let greet = {
    count: counterVal
  }
  // put it again the settingsbill data on screen , render it on second parameter:
  res.render("index", {
    
    // timeOfGreets,
    names: await greetedNames.rows, title: "Home",
    greet
  });
  
  
});


// help me set my data on the screen and output on the with my counter and my warning messagem

//settings route that is a post as per instructions
app.post("/greetings", async function (req, res) {

  //  greetings.setName(req.body.userName)
  try {

    const greets = req.body.language;
    var userName = req.body.userName;
    // const time = req.body.time;
    //  var greetingPerson = await greetings.enterName(userName)

    //  await greetings.getName();
    if (!(greets && userName)) {

      // keeping div blank

      //  document.getElementById("textfield2").value = "";
      // await greetings.language() = ""

      req.flash("info", "do enter your name and select a language")
    } else if (!userName) {
      req.flash("info", "enter your name")
    } else if (!greets) {
      req.flash("info", "select a language!")
    }
    // else if (lang === "Afrikaans") {
    //   req.flash = "sleutel, jou naam asseblief" + name + " !"
    // }

    if(userName){
      await greetings.enterName(userName)

    }


    let greet = {

      names: await greetings.language(greets, userName),
      count: await greetings.overallCounter()

    }

    await greetings.getName()
    res.render("index", {
      greet
      // timeOfGreets
      //greet

    });

  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.stack);

  }

});

app.get('/greeted', async function (req, res) {
  var names = await greetings.getName()
  // console.log(names + "zxcvbnasdfghdfg")
  res.render('greeted', {
    name: names

  })
})



app.get('/counter/:name', async function (req, res) {

  const { name } = req.params

  var count = await greetings.getCountForUser(name);
 // console.log(count);

  res.render('counter',
    { name, count }
  )

});

app.get("/reset", async function (req, res) {

await greetings.resetFtn()

res.redirect("/")

});







const PORT = process.env.PORT || 3013


app.listen(PORT, function () {
  console.log("app started at port:", PORT);

});