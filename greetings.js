module.exports = function (pool){

   async function greet(personName, language){

     if(personName !== "" && language !== undefined){
      var foundUsers = await pool.query("select * from users where name=$1", [personName])
       if(foundUsers.rows.length === 0){
          await pool.query("insert into users(name, counter) values($1, 0)", [personName]);
       }
       await pool.query("update users set counter=counter+1 where name=$1", [personName]);

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

   async function greetCounter(){
     //console.log(differentNames)
     let results = await pool.query("select count(*) from users");
     return results.rows[0].count;
   }
   async function returnUsers(){
     let users = await pool.query("select * from users");
     return users.rows;
   }

   async function reset(){
     let reset = await pool.query("delete from users");
     return reset.rowCount;
   }

   return{
     greet,
     greetCounter,
     reset,
     returnUsers
   }
 }
