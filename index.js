//Baisc express needs 
const express=require('express');
const app=express();
const port = 8000;

//Middlewares
app.use(express.urlencoded());

//accessing static files
app.use(express.static('assets'));

//Views 
app.set('view engine','ejs');
app.set('views','./views');


//use express router
app.use('/',require('./routes'));

//Running the server up!
app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
})