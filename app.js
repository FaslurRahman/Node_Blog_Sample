const express = require ('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const blogRouter = require('./routes/blogRoutes')

//express apps
const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://netninja:test1234@nodetuts.baa76.mongodb.net/note-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser:true, useUnifiedTopology:true})

 .then((result)=> app.listen(3000))
 .catch((err)=> console.log(err));



//register view engine
app.set('view engine', 'ejs');



//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
//app.use(morgan('tiny'));




 //routes
app.get('/',(req,res)=>{
    
    res.redirect('/blogs');
});



app.get('/about',(req,res)=>{
   res.render('about',{title:'About'});
});


//blog routes

app.use('/blogs',blogRouter);
//404 not found
app.use((req,res)=>{
    res.status(404).render('404',{title:'404'});
});






