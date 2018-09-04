let express = require('express');
let expressHandlebars = require('express-handlebars');
let bodyParser = require('body-parser');
// let flash = require('express-flash');
// let session = require('express-session');
const pg = require("pg");
const Pool = pg.Pool;


let greetings = require('./greetings')
let app = express();
//----------FOR SENDING DATA AS A FORM TO THE SERVER!!! -------
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//for public folder #Static_Resource!!!
app.use(express.static('public'));

let PORT = process.env.PORT || 3030;

let useSSL = false;
if (process.env.DATABASE_URL) {
  useSSL = true;
}

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://coder:coder123@localhost:5432/greetings_webapp";

const pool = new Pool({
  connectionString,
  ssl: useSSL
});

let greetingsInstance = greetings(pool);


app.engine('handlebars', expressHandlebars({defaultLayout: 'links'}));
app.set('view engine', 'handlebars');

app.get('/', async function(req,res){
			let count = await greetingsInstance.greetCounter();
			// console.log(greetingsInstance.greetCounter());

			res.render('greet', {count})
});

app.post('/greetings', async function(req, res){
// -----GO TO HTML ----
    let text  = req.body.textInput;
		let radio = req.body.language;

		var results = {
			greeting: await greetingsInstance.greet(text, radio),
			count: await greetingsInstance.greetCounter()
		}

    res.render('greet', results);
});

app.get("/counter", function(req,res){
		greetingsInstance.greetCounter();
		res.redirect('/');
});

app.get('/displayNames', function(req,res){
	 	greetingsInstance.getListName();
		res.redirect('/');
});

app.get('/reset', async function(req, res){
		var reset = await greetingsInstance.reset();
		console.log(reset);
		res.render('/', {reset});
});

app.get('/flash', function (req, res) {
    req.flash('info', 'Please enter a valid name/select a language!');
    res.redirect('/');
});

// let PORT = process.env.PORT || 3030;

app.listen(PORT, function(){
  	console.log('App starting on port', PORT);
});
