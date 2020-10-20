// separating routes factory function

module.exports = function routesFact(greetings) {


    const username = async function (req, res) {

        // No default engine was specified and no extension was provided(Error: for me to use render,)
        //install, npm install --save express-handlebars
        // npm install --save body-parser(forms to work)

        //flash warning message
        req.flash('info',);

        //  const greetedNames = await pool.query('select id, name,count as greets, time as "timeOfGreets" from greetings');

        let greetedNames = await greetings.newFunctionFirstRoute();
        //console.log(greetedNames);
        let counterVal = await greetings.overallCounter();

        let greet = {
            count: counterVal
        }
        // put it again the settingsbill data on screen , render it on second parameter:

        res.render("index", {

            // timeOfGreets,
            names: await greetedNames, title: "Home",
            greet
        });


    };




    const secondRoute = async function (req, res) {

        try {

            const greets = req.body["language"];
            // // console.log(greets);
            var userName = req.body.userName;

            // const { langauge, userName} = req.body;


            // console.log(userName);
            userName = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
            var regex = /^[a-zA-Z]+$/;


            // keeping div blank

            if (userName === "") {
                req.flash("info", "enter your name")

            }

            if (regex.test(userName)) {



                // console.log(userName.match(regex2));

                await greetings.enterName(userName)



                console.log('here now');

                greet = {

                    names: await greetings.language(greets, userName),
                    count: await greetings.overallCounter()

                }
            }

            greet = {

                names: await greetings.language(greets, userName),
                count: await greetings.overallCounter()

            }
                console.log('before rendering');

                // console.log(greet)

                // await greetings.getName()

                res.render("index", {
                    greet
                    // timeOfGreets
                    //greet


                })

        }
        catch (error) {
            console.log(error.name);
            console.log(error.message);
            console.log(error.stack);

        }


    };




    const thirdRoute = async function (req, res) {



        const newName = req.params.userName;

        var names = await greetings.getName()
        // console.log(names + "zxcvbnasdfghdfg")
        if (newName != null) {

            await greetings.enterName(newName)

        }

        res.render('greeted', {
            name: names

        })
    }

    const forthRoute = async function (req, res) {



        const { name } = req.params

        var count = await greetings.getCountForUser(name);


        res.render('counter',
            { name, count }
        )

    }


    const fifthRoute = async function (req, res) {


        await greetings.resetFtn()

        res.redirect("/")

    }




    return {
        username,
        secondRoute,
        thirdRoute,
        forthRoute,
        fifthRoute,


    };

}


 // const  thirdRoute  = async function(req,res) {


    //         const newName = req.params.userName;

    //         var names = await greetings.getName()
    //         // console.log(names + "zxcvbnasdfghdfg")
    //         if (newName != null) {

    //           await greetings.enterName(newName)

    //         }

    //         res.render('greeted', {
    //           name: names

    //         })
    //       }













