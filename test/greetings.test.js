const assert = require('assert');
const Greet = require('../greetings');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || "postgresql://coder:coder123@localhost:5432/greetings_webapp";

const pool = new Pool({
    connectionString
});

describe('The basic database web app', function(){

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from greetings_webapp;");
    });

    it('should pass the db test', async function(){

        // the Factory Function is called Greet
        let greetMe = Greet(pool);
        await greetMe.add({
            description : "Diary"
        });

        let categories = await greetMe.all();
        assert.equal(1, categories.length);

    });

    after(function(){
        pool.end();
    })
});
