module.exports = function (pool){

   async function greet(personName, language){

     if(personName !== "" && language !== undefined){
      var foundUsers = await pool.query("select * from users where name=$1", [personName.toUpperCase()]);
       if(foundUsers.rows.length === 0){ //---IF AKUKHONTO   kwiROW!   FAKA    EZIZINTO!!!---
          await pool.query("insert into users(name, counter) values($1, 0)", [personName.toUpperCase()]);
       }
       await pool.query("update users set counter=counter+1 where name=$1", [personName.toUpperCase() ]);

       if(language === "English"){
         return "Good day, " + personName.toUpperCase();
       }

       else if(language == "Isixhosa"){
         return "Molo, " + personName.toUpperCase();
       }

       else if(language == "Afrikaans"){
          return "Goeie dag, " + personName.toUpperCase();
       }
     }
  }

   async function greetCounter(){
     let results = await pool.query("select count(*) from users");
     return results.rows[0].count;
   }
   async function returnUsers(){
     let users = await pool.query("select * from users");
     return users.rows;
   }
 async function users(name){
   let displayUsers = await pool.query("select * from users where name=$1", [name]);
   return displayUsers.rows;
 }

   async function reset(){
     let reset = await pool.query("delete from users");
     return reset.rowCount;
   }

   return{
     greet,
     greetCounter,
     reset,
     users,
     returnUsers
   }
 }
