const assert = require("assert");
const greetings = require("../greetings");

const pg = require("pg");
const { reset } = require("nodemon");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://thembajoseph:themba17307@localhost:5432/greetings_tests';
const pool = new Pool({
	connectionString
});

let instance = greetings(pool);


describe("The greetings webapp", async  function () {


	beforeEach(async function () {
		await pool.query("delete from greetings");
	});

	it("should be able to add a greet", async function () {


		await instance.enterName("Themba");
		await instance.enterName("Sipho");
		await instance.enterName("Tello");

		assert.deepEqual[{ name: "Themba" }, { name: "Sipho" }, { name: "Tello" }], await instance.
			getName();

	});

	it("should be able set the name of the user and get overall counter", async function () {
		// let instance = greetings(pool);
		await instance.enterName("Themba");

		assert.equal(await instance.overallCounter(), 1);

	});

	it("should be able take in a different language and return message", async function () {
		

		var message = await instance.language("Isixhosa", "Themba");
		var message2 = await instance.language("English", "Themba");
		var message3 = await instance.language("Afrikaans", "Sipho");


		assert.equal(message, "Molo, Themba" + " !");
		assert.equal(message2, "Hello, Themba" + " !");
		assert.equal(message3, "Hallo, Sipho" + " !");

	});


	it("should be able check if no name is updated and return undefined or empty", async function () {

		let instance = greetings(pool);

		assert.equal(undefined, await instance.getCountForUser('sipho'));

	});

	it("should be able check count for specific  user", async function () {

		let instance = greetings(pool);

		//await instance.existDbAndCount();

		await instance.enterName("Thabie");
		await instance.enterName("zweli");

		assert.deepEqual(await instance.getCountForUser("zweli"), 1);

	});


		it("should be able to reset the counter back to zero", async function () {

			let instance = greetings(pool);

			
			await instance.enterName("Hloni");
			await instance.enterName("Tau");

	await instance.resetFtn()
			assert.deepEqual([], await instance.getName() );

		});

});



















// - DATABASE_URL=postgresql://postgres@localhost:5432/my_products_tests


	// ### functions tests

//await instance.existDbAndCount();



// let instance = greetings(pool);




		//await instance.existDbAndCount();

		// await instance.enterName("sipho");
		// await instance.enterName("sipho");


	// insert query to look into
	// const INSERT_QUERY = 'INSERT INTO greetings (name, count) values($1,$2)'

// it("should be able check if no name is updated and return undefined or empty", async function () {

	// 	let instance = greetings();

	// 	await instance.existDbAndCount();

	// 	await instance.enterName();
	// 	await instance.enterName();

	// 	assert.equal(await instance.existDbAndCount("Thabiso"), undefined);

	// });

































	// ###               query tests

	// it("should be able to find a greet", async function () {

	// 	await pool.query(INSERT_QUERY, ["Hloni", 7]);

	// 	const results = await pool.query("select * from greetings where name = $1", ["Hloni"]);

	// 	// what fields should have been found in the database?5
	// 	assert.equal("Hloni", results.rows[0].name);
	// 	assert.equal(7, results.rows[0].count);
	// 	//assert.equal("Thursday", results.rows[0].arriving_on);

	// });



	// it("should be able to update greetings", async function () {

	// 	await pool.query(INSERT_QUERY, ["Pedro", 4]);

	// 	let results = await pool.query("select * from greetings where name = $1", ["Pedro"]);

	// 	assert.equal("Pedro", results.rows[0].name);
	// 	assert.equal(4, results.rows[0].count);


	// 	await pool.query("update greetings set count = $2  where name = $1", ["Pedro", 5]);

	// 	results = await pool.query("select * from greetings where name = $1", ["Pedro"]);

	// 	// what new values should have been found
	// 	assert.equal("Pedro", results.rows[0].name);
	// 	assert.equal(5, results.rows[0].count);

	// });

	// it("should be able to find greetings for 5 counts or longer", async function () {

	// 	await pool.query(INSERT_QUERY, ["Pearl", 5]);
	// 	await pool.query(INSERT_QUERY, ["Quinton", 3]);
	// 	await pool.query(INSERT_QUERY, ["Thabile", 7]);

	// 	const results = await pool.query("select count(*) from greetings where count >= 5");

	// 	// how many bookings should be found?
	// 	assert.equal(2, results.rows[0].count);

	// });

	// after(function () {
	// 	pool.end();
	// })

// });









// await pool.query(INSERT_QUERY, ["Themba", 1]);
	// await pool.query(INSERT_QUERY, ["Sipho", 3, ]);

	//const results = await pool.query("select count(*) from greetings");

	// how many bookings should have been added?
	// 	assert.equal(2, results.rows[0].count);

	// });

	// it("should be able to find all greetings", async function () {

	// 	let instance = greetings();

	// 	//names: await greetings.language(greets, userName),



	// 	await instance.language("Isixhosa", "Themba");
	// 	await instance.language("English", "Sipho");
	// 	await instance.language("Afrikaans", "Tello");


	// 	var lang = "Isixhosa";
	// 	var name = "Themba";

	// 	assert.equal(await instance.language(lang, name), 'Molo, Themba');





	// await pool.query(INSERT_QUERY, ["Mahlatsi", 4]);
	// await pool.query(INSERT_QUERY, ["Thando", 3]);
	// await pool.query(INSERT_QUERY, ["Tau", 7]);

	// const results = await pool.query("select count(*) from greetings");

	// how many bookings should be found?
	//assert.equal(3, results.rows[0].count);


	// });


	// it("should be able get the name of the user", async function () {
	// 	let instance = greetings(pool);

	// 	await instance.enterName("Themba")
	// 	await instance.enterName("Tello")
	// 	await instance.enterName("Mahlatsi")

	// 	assert.deepEqual(["Themba", "Tello", "Mahlatsi"], await instance.getName());

	// });


// it("should be able count the number of people greeted", async function () {
	// 	let instance = greetings();

	// 	await instance.enterName("Sipho");
	// 	await instance.enterName("Thabiso");
	// 	await instance.enterName("Tello");

    // let count = await pool.query('SELECT id FROM greetings');
	// assert.deepEqual( await instance.getCountForUser(), 3);


	// });


// -- sudo -u postgres createdb greetingsWebapp;
// -- Insert into greetings (name, count , time)
// -- values ('Themba', 3, '2020-09-08 14:05:10+02');


// -- Insert into greetings (name, count , time)
// --  values ('Themba', 3, '2020-09-08 14:05:10+02');
// -- id |   name   | number_of_greetings |       time_of_greets       
// -- ----+----------+---------------------+----------------------------
// --   1 | Tau      |                   3 | 2020-09-08 04:10:25+02
// --   2 | Themba   |                   2 | 2020-09-08 00:15:28+02
// --   3 | Sipho    |                   1 | 2020-09-08 01:12:30+02
// --   4 | Mahlatsi |                   4 | 2020-09-08 02:05:10+02
// --  26 |          |                     | 
// --  27 |          |                   1 | 2020-09-09 12:46:17.753+02
// --  28 |          |                   1 | 2020-09-09 12:47:10.171+02
// --  29 |          |                   1 | 2020-09-09 12:47:59.534+02
// -- (29 rows)




// });




