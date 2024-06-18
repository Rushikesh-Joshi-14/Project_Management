const mongoose = require('mongoose');

module.exports =  async () => {
   

    try{
        await mongoose.connect("mongodb://localhost:27017/") ;
        console.log("connection Suceessful") ;

    }
    catch(error){
        console.log(error) ;
        console.log("Connetion Failed") ;

    }
}