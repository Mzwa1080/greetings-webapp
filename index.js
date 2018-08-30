let express = require('express');
let expressHandlebars = require('express-handlebars');
let bodyParser = require('body-parser');

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

    res.redirect('/')
});

app.get("/counter", function(){
		let count = greetingsInstance.greetCounter();

		res.redirect('/', {count})
})


app.get('/displayNames', function(){
		let display = greetingsInstance.getListName();
		res.redirect('/', display);
})

app.get('/reset', function(){

		greetingsInstance.reset();
		res.redirect('/');
});

let PORT = process.env.PORT || 3030;

app.listen(PORT, function(){
  	console.log('App starting on port', PORT);
});
