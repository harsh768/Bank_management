//Baisc express needs 
const express=require('express');
const app=express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

//using database
const db= require('./config/mongoose');

// Using flash for flash messages
// const flash=require('connect-flash');
// const customMware = require('./config/middleware');

//Middlewares
app.use(express.urlencoded());

//accessing static files
app.use(express.static('assets'));

app.use(expressLayouts);

//extract style and scripts from sub pages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//Views 
app.set('view engine','ejs');
app.set('views','./views');

// app.use(flash());
// app.use(customMware.setFlash);

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