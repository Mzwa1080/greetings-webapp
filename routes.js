module.exports = function(services){

  async function setting(req, res){
  // -----GO TO HTML ----
      let text  = req.body.textInput;
  		let radio = req.body.language;

      if(text == "" || text == undefined){
        req.flash("info", "Please enter your name!");
      } else if(!radio){
        req.flash("info", "Please select a language!");
      }

  		var results = {
  			greeting: await services.greet(text, radio),
  			count: await services.greetCounter()
  		}

      res.render('greet', results);
  };

  async function home(req,res){
  			res.render('greet', {count:await services.greetCounter()})
  };

  async function database(req,res){
  		res.render('db', {users:await services.returnUsers()});
  };

  async function greetedNames(req, res){
    let name = req.params.user_name;
    let person = await services.users(name);
    let display = person[0].counter;

    res.render('counter',{name, display});
  };

  async function reset(req, res){
  	 await services.reset()
  		res.render('db');
  };

  return {
      home,
      setting,
      database,
      greetedNames,
      reset
  }
}
