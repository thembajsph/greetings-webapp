const assert = require("assert");

describe("The greetings webapp", function () {

	const pg = require("pg");
	const Pool = pg.Pool;
	const connectionString = process.env.DATABASE_URL || 'postgresql://thembajoseph:themba17307@localhost:5432/greetingsWebapp_tests';
	const pool = new Pool({
		connectionString
	});

	// insert query to look into
	const INSERT_QUERY = 'INSERT INTO greetings (name, count) values($1,$2)'
	

	beforeEach(async function () {
		await pool.query("delete from greetings");
	});

	it("should be able to add a greetings", async function () {

		await pool.query(INSERT_QUERY, ["Themba", 1]);
		await pool.query(INSERT_QUERY, ["Sipho", 3, ]);

		const results = await pool.query("select count(*) from greetings");
		
		// how many bookings should have been added?
		assert.equal(2, results.rows[0].count);

	});

	it("should be able to find all greetings", async function () {

		await pool.query(INSERT_QUERY, ["Mahlatsi", 4]);
		await pool.query(INSERT_QUERY, ["Thando", 3]);
		await pool.query(INSERT_QUERY, ["Tau", 7]);

		const results = await pool.query("select count(*) from greetings");

		// how many bookings should be found?
		assert.equal(3, results.rows[0].count);
		
	});

	it("should be able to find a greet", async function () {

		await pool.query(INSERT_QUERY, ["Hloni", 7]);

		const results = await pool.query("select * from greetings where name = $1", ["Hloni"]);

		// what fields should have been found in the database?
		assert.equal("Hloni", results.rows[0].name);
		assert.equal(7, results.rows[0].count);
		//assert.equal("Thursday", results.rows[0].arriving_on);

	});

	it("should be able to update greetings", async function () {

		await pool.query(INSERT_QUERY, ["Pedro", 4]);

		let results = await pool.query("select * from greetings where name = $1", ["Pedro"]);

		assert.equal("Pedro", results.rows[0].name);
		assert.equal(4, results.rows[0].count);


		await pool.query("update greetings set count = $2  where name = $1", ["Pedro", 5]);

		results = await pool.query("select * from greetings where name = $1", ["Pedro"]);

		// what new values should have been found
		assert.equal("Pedro", results.rows[0].name);
		assert.equal(5, results.rows[0].count);
		

	});


	it("should be able to find greetings for 5 counts or longer", async function () {

		await pool.query(INSERT_QUERY, ["Pearl", 5]);
		await pool.query(INSERT_QUERY, ["Quinton", 3]);
		await pool.query(INSERT_QUERY, ["Thabile", 7]);

		const results = await pool.query("select count(*) from greetings where count >= 5");

		// how many bookings should be found?
		assert.equal(2, results.rows[0].count);
		
	});

	after(function() {
		pool.end();
	})

});