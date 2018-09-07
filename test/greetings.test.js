const assert = require('assert');
const Greet = require('../greetings');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder123@localhost:5432/greetings_webapp';

const pool = new Pool({
    connectionString
});

describe('The basic database web app', function(){

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from users;");
    });

    it('should pass if there\'s no one greeted', async function(){

        // the Factory Function is called Greet
        let greetMe = Greet(pool);
        // let count = await greetMe.greetCounter();
        assert.equal(0, await greetMe.greetCounter());

    });

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from users;");
    });

    it('should count 1 person who is greeted in Isixhosa', async function(){

        // the Factory Function is called Greet
        let greetMe = Greet(pool);
        await greetMe.greet("Mzwamadoda", "Isixhosa");

        assert.equal(1, await greetMe.greetCounter());

    });


    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from users;");
    });

    it('should count 1 person who is greeted in English', async function(){

        // the Factory Function is called Greet
        let greetMe = Greet(pool);
        await greetMe.greet("Shawn", "English");

        assert.equal(1, await greetMe.greetCounter());

    });

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from users;");
    });

    it('should GREET the person in a selected language', async function(){

        // the Factory Function is called Greet
        let greetMe = Greet(pool);
        // let checkLang = await greetMe.greet("Mzwamadoda", "Isixhosa");
        assert.equal("Molo, MZWAMADODA", await greetMe.greet("Mzwamadoda", "Isixhosa"));

    });

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from users;");
    });

    it('should count everyone greeted', async function(){

        // the Factory Function is called Greet
        let greetMe = Greet(pool);
        await greetMe.greet("Mzwa", "English");
        await greetMe.greet("Shawn", "Isixhosa");
        await greetMe.greet("Andre", "English");
        await greetMe.greet("buta", "Afrikaans");

        // let count = await greetMe.greetCounter();
        assert.equal(4, await greetMe.greetCounter());

    });


    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from users;");
    });

    it('should not add a single person greeting in different languages', async function(){

        // the Factory Function is called Greet
        let greetMe = Greet(pool);
        await greetMe.greet("Mzwa", "English");
        await greetMe.greet("Mzwa", "Afrikaans");
        await greetMe.greet("Andre", "English");
        await greetMe.greet("Sbu", "Afrikaans");
        await greetMe.greet("Andre", "Isixhosa");

        // let count = await greetMe.greetCounter();
        assert.equal(3, await greetMe.greetCounter());

    });






    after(function(){
        pool.end();
    })
});
