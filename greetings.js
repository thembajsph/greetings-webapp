module.exports = function greet(pool) {

  var greetedNames = [];

  function setName(name) {

    if (greetedNames.some(person => person.user === name)) {
      for (let key of greetedNames) {
        console.log(key.counter + 1);

        if (key.user === name) {
          key.counter++;
        }
      }



    } else {
      greetedNames.push({
        user: name,
        counter: 1
      })
    }
  };

  async function enterName(name) {
    const INSERT_QUERY = await pool.query('INSERT INTO greetings (name, count) values($1,$2)', [name,1])
  };



  //const EVERY_QUERY  = await pool.query ('SELECT * from greetings')
  // if (!greetedNames.includes(name)) {
  //   greetedNames.push(name)
  // }







  async function existDbAndCount(name) {
    try {
      
      const updateQuery = await pool.query('SELECT name FROM greetings WHERE name = $1', [name]);
      return updateQuery;
    } catch (error) {
      console.log(error.name)
      console.log(error.message)
      console.log(error.stack)
    }
    // };
    //  SET count = count.rows
    // FROM count.rows

  }




  function updateCount(name) {

    try {

      const countQuery = pool.query('UPDATE greetings SET count = count +1 WHERE name = $1', [name]);



console.log(countQuery);
    } catch (error) {
      console.log(error.name)
      console.log(error.message)
      console.log(error.stack)
    };
  }


  // function updatedate() {
  //   try {
  //     const dateQuery = 

  //     // return dateQuery;


  //   } catch (error) {
  // 
    //  console.log(error.name)
  //     console.log(error.message)
  //     console.log(error.stack)
  //   };

  // }




     
  function errorFlash(name) {

    try {
      if (name = "") {

    if (lang === "Isixhosa" ) {
       req.flash = "faka igama lakho," + name + " !"
     }
     else if (lang === "English") {
       req.flash =  "do enter your name, " + name + " !"
     }
     else if (lang === "Afrikaans") {
       req.flash = "sleutel, jou naam asseblief" + name + " !"
     }
   }
   
 }  
     catch (error) {
     console.log(error.name)
     console.log(error.message)
     console.log(error.stack)
    };
   
  }
    



  async function language(lang, name) {
    //var rowCount = table.rows.length;

    let check = await existDbAndCount(name);
    console.log(check);
    if (check.rows === 0) {

     await enterName(name)
    }  
   await updateCount(name)
    if (lang === "Isixhosa") {
      return "Molo, " + name + " !"
    }
    else if (lang === "English") {
      return "Hello, " + name + " !"
    }
    else if (lang === "Afrikaans") {
      return "Hallo, " + name + " !"
    }

  }



  async function getName() {
    let names = await pool.query('SELECT name FROM greetings')
    console.log(names);
    return names.rows;
  }

  //must used what we have in local storage(key value pairs in storage) object in storage .

  async function overallCounter() {
    let count = await pool.query('SELECT id FROM greetings');
    console.log( count.rowCount);
    return count.rowCount;
  }

  function hasNumbers(name) {

  };
  function clear() {
    greetedNames = {};
  }



  return {
    clear,
    setName,
    getName,
    language,
    overallCounter,
    hasNumbers,
    enterName,
    existDbAndCount,
    updateCount,
    errorFlash


  };

};
