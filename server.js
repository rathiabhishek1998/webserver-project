const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
hbs.registerHelper('getcurrentYear',() =>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt' ,(text) =>{
    return text.toUpperCase();
});

app.use(express.static(__dirname + '/public'));
app.use((req,res,next) =>{
    var now = new Date().toString();
    var log = `${now}: ${req.meathod} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err) =>{
        if(err)
        {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

//app.use((req,res,next) =>{
//    res.render('magnanse.hbs',{
//        pageTitle:'We will be right back',
//        welcome:'This site is currently being updated'
//    });
//});




app.get('/',(req,res) =>{
   res.render('home.hbs',{
    pageTitle:'Home Page',
    welcome:'Welcome to our home page',
   });
});

app.get('/about',(req,res) =>{
    res.render('about.hbs',{
        pageTitle:'About Page',
    });
});

app.get('/project',(req,res) =>{
    res.render('project.hbs',{
        pageTitle:'Projects',
    });
});


app.get('/bad',(req,res) =>{
    res.send('ErrorMesssage');
});

app.listen(port,() =>{
    console.log(`Server ${port} is up`);
});