const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const Blog = require('./models/blog');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));


app.set('views',path.join(__dirname,'views'));
app.set('view engine',"ejs");


app.get('/',(req,res)=>{
    Blog.find()
    .then((posts)=>{
        res.render('index',{posts:posts});

    });
});

app.get('/new',(req,res)=>{
    res.render('newPost');
});

app.get('/edit/:id',(req,res)=>{
    Blog.findById(req.params.id)
    .then((post)=>{
        res.render('update',{post:post});

    });
});

app.post('/update/:id',(req,res)=>{
    Blog.findByIdAndUpdate(req.params.id,{$set:{
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        image: req.body.image
    }})
    .then((post)=>{
        res.redirect('/')

    });
});

app.post('/newAdded',(req,res)=>{
    var newPost = new Blog({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        image: req.body.image
    });
    newPost.save()
    .then((post)=>{
        console.log(post);
    });

    res.redirect('/');
});

app.get('/delete/:id',(req,res)=>{
    Blog.findByIdAndRemove(req.params.id)
    .then((post)=>{
        console.log(post);
        res.redirect('/');
    });
});

app.listen(3000);