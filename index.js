let express = require('express');
let expressHandlebars = require('express-handlebars');
let bodyParser = require('body-parser');
let flash = require('flash')

let greetings = require('./greetings')
let greetingsInstance = greetings();
let app = express();
//----------FOR SENDING DATA AS A FORM TO THE SERVER!!! -------
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//for public folder #Static_Resource!!!
app.use(express.static('public'));

app.engine('handlebars', expressHandlebars({defaultLayout: 'links'}));
app.set('view engine', 'handlebars');

app.get('/', function(req,res){
			let displayNames = greetingsInstance.greet(greetingsInstance.getListName(), greetingsInstance.getLang());
			let count = greetingsInstance.greetCounter();
			// console.log(greetingsInstance.greetCounter());

			res.render('greet', {displayNames, count})
});

app.post('/greetings', function(req, res){
// -----GO TO HTML ----
    let text  = req.body.textInput;
		let radio = req.body.language;

		greetingsInstance.lang(radio);
		greetingsInstance.setName(text);

    res.redirect('/');
});

app.get("/counter", function(req,res){
		greetingsInstance.greetCounter();
		res.redirect('/');
});

app.get('/displayNames', function(req,res){
	 	greetingsInstance.getListName();
		res.redirect('/');
});

app.get('/reset', function(req, res){
		greetingsInstance.reset();
		res.redirect('/');
});

app.get('/flash', function (req, res) {
    req.flash('info', 'Please enter a valid name/select a language!');
    res.redirect('/');
});

let PORT = process.env.PORT || 3030;

app.listen(PORT, function(){
  	console.log('App starting on port', PORT);
});
