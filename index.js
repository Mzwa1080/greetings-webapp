let express = require('express');
let expressHandlebars = require('express-handlebars');
let bodyParser = require('body-parser');
let flash = require('express-flash');
let session = require('express-session');
const pg = require("pg");
const Pool = pg.Pool;

let greetings = require('./greetings');
let Routes = require('./routes')
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
let routes = Routes(greetingsInstance);

app.engine('handlebars', expressHandlebars({defaultLayout: 'links'}));
app.set('view engine', 'handlebars');

app.get('/', routes.home);

app.post('/greetings', routes.setting);

app.get('/greetings/database', routes.database);

app.get('/counter/:user_name', routes.greetedNames);

app.get('/reset', routes.reset);

// let PORT = process.env.PORT || 3030;
let PORT = process.env.PORT || 3080;
app.listen(PORT, function(){
  	console.log('App starting on port', PORT);
});
