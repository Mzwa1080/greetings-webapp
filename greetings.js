module.exports = function (storedUsers){
   var differentNames = {};
   var personName = "";
   var language = "";
   var countThem = 0;

//Function that'll store differentNames & prints out names only
   function name(value){
     if(differentNames[value] === undefined){
        personName = value;
        differentNames[personName]=0;
     }
   }

   function lang(value){
     language = value;
   }

   function setName(name){
     personName = name;
   }

   function greet(personName, language){

     if(personName !== "" && language !== undefined){

       if(differentNames[personName] === undefined){
          personName = personName;
          differentNames[personName]=0;
       }

       if(language === "English"){
         return "Good day, " + personName;
       }

       else if(language == "Isixhosa"){
         return "Molo, " + personName;
       }

       else if(language == "Afrikaans"){
          return "Goeie dag, " + personName;
       }
     }
     else {
       return "Please enter a valid name/select a language!"
     }

  }

   function forTheCounter(){
      countThem++;
   }

   function continueCounting(){
      return countThem;
   }

   function greetCounter(){
     //console.log(differentNames)
     return Object.keys(differentNames).length;
   }

   function getNames(){
     return name;
   }

   function getLang(){
     return language;

   }

   function getListName(){
     return personName;
   }

   function reset(){
     let differentNames = {};
     let personName = "";
     let countThem = 0;
     let language = "";
   }

   return{
     name,
     lang,
     greet,
     greetCounter,
     getNames,
     getLang,
     getListName,
     forTheCounter,
     continueCounting,
     setName,
     reset
   }

 }
