
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
  req.flash('info', 'Flash Message Added');

  let greet = {
    count: await greetings.overallCounter()
  };

  const greetedNames = await pool.query('select id, name,count as greets, time as "timeOfGreets" from greetings');


  // put it again the settingsbill data on screen , render it on second parameter:
  res.render("index", {
    greet,
    // timeOfGreets,
    names: await greetedNames.rows
  });
});


// help me set my data on the screen and output on the with my counter and my warning messagem

//settings route that is a post as per instructions
app.post("/greetings", async function (req, res) {

  //  greetings.setName(req.body.userName)
  try {

    const greets = req.body.language;
    var userName = req.body.userName;
    const time = req.body.time;
    //  var greetingPerson = await greetings.enterName(userName)

    //  await greetings.getName();
    if (userName ==="") {

      await greetings.errorFlash();
    }

    greetings.enterName(userName)

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
    console.log("error 1")
  }

});

app.get('/greeted', async function (req, res) {
  var names = await greetings.getName()
 // console.log(names + "zxcvbnasdfghdfg")
  res.render('greeted', {
    name: names

  })
})



app.get('/counter/:username', async function (req, res) {


  try {

    var userParams = await greetings.getName(req.params.username)
    // const user = req.params.userName;

          var actionLists2 =   greetings.actions(actionType)
    var finalMsg = "{{name}] has been greeted {{count}},  ";

    res.render('counter', { userParams, finalMsg })

  }
  catch (error) {
      console.log(error.name);
     console.log(error.message);
      console.log(error.stack);

  }

});

//      const greets = req.body.language ;
//     const userName = req.body.userName;
//      const timeOfGreets = req.body.timeOfGreets;
//   // var greetingPerson = await greetings.enterName(userName)
// //   //  await greetings.getName();


// //     let greet = {
// //       names: await greetings.language(greets, userName),
// //       count: await greetings.overallCounter()

// //     }
//    await greetings.getName()
//      res.render("index", {
//       greet,
//        userName,
// //       timeOfGreets
// //       //greet

// //     });

//   } catch (error) {
//     console.log(error.name);
//     console.log(error.message);
//     console.log(error.stack);
//     //console.log("error 1") 
//     //next(error)
//   }



const PORT = process.env.PORT || 3013


app.listen(PORT, function () {
  console.log("app started at port:", PORT);

});

















//# 1 
//  else {

  //   function validate(value, result) {
  //     if (!value) {
  //       return result;
  //     }
  //     return {};


  // const daysInvalid = validate(greets, {
  //   style: "is-invalid",
  //   message: "Enter a valid number og greets"
  // });

  // const kittenNameInvalid = validate(name, {
  //   style: "is-invalid",
  //   message: "Enter a valid name"
  // });

  // const arrivingOnInvalid = validate(arrivingOn, {
  //   style: "is-invalid",
  //   message: "Please select correct Time"
  // });
  // const greetedNames = await pool.query('select id, name, staying_for as days, arriving_on as "arrivingOn" from booking');
  // const greetedNames = await pool.query('select id, name, number_of_greetings as greets, time_of_greets as "timeOfGreets" from greetings');

  //2


//});
  // }



  //local 

  // render new created template actions.handlebars, send something in (second parameter)
  // res.render("greets", { greets: greetLists });



// // // another route, the Action route
// app.post("/greets",function (req, res) {

//    // capture the type to add
//   console.log();

// //   //want to send the call and sms to my factort function
//    greet.setName(req.body.greets);

// //   // redirect to the home /first route for now once done
//    res.redirect("/");

// });


// function setAll() {

//   greetings.setName({
//     names: req.body.callCost
//   });

//   greetings.language({
//     language: req.body.

//  });

//   greetings.counter(){
//     counter: req.body.

//  };


//   return {


//   }
// }

// setAll();
//   smsCost: req.body.smsCost,
//   warningLevel: req.body.warningLevel,
//   criticalLevel: req.body.criticalLevel


// // when we send to the server our request will be available in the body so...req.body
// console.log(settingsBill.getSettings());

// redirect to the home /first route for now



// ivaya yodwa
    // take it out ,no longer using local variable, or your local , now pushing data to the the database 
    // kittens.push({
    // 	id : kittens.length+1,
    // 	days,
    // 	name,
    // 	arrivingOn
    // });