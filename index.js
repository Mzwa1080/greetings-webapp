let express = require('express');
let expressHandlebars = require('express-handlebars');
let bodyParser = require('body-parser');
let flash = require('express-flash');
let session = require('express-session');
const pg = require("pg");
const Pool = pg.Pool;

let greetings = require('./greetings');

let app = express();

app.use(session({
    secret: 'This is going to be a line that I will use to display an error',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());
//----------FOR SENDING DATA AS A FORM TO THE SERVER!!! -------
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//for public folder #Static_Resource!!!
app.use(express.static('public'));

let useSSL = false;
if (process.env.DATABASE_URL) {
  useSSL = true;
}

const connectionString = process.env.DATABASE_URL ||
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

    if(text == "" || text == undefined){
      req.flash("info", "Please enter your name!");
    } else if(!radio){
      req.flash("info", "Please select a language!");
    }

		var results = {
			greeting: await greetingsInstance.greet(text, radio),
			count: await greetingsInstance.greetCounter()
		}

    res.render('greet', results);
});

app.get('/greetings/database', async function(req,res){
let users = await greetingsInstance.returnUsers();
		res.render('db', {users});
});

app.get('/counter/:user_name',async function(req, res){
  let name = req.params.user_name;
  let person = await greetingsInstance.users(name);
  let display = person[0].counter;
  
  res.render('counter',{name, display});
})

app.get('/reset', async function(req, res){
	 await greetingsInstance.reset()

		res.render('db');
});

// let PORT = process.env.PORT || 3030;
let PORT = process.env.PORT || 3080;
app.listen(PORT, function(){
  	console.log('App starting on port', PORT);
});
