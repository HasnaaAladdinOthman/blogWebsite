import express from 'express';
import bodyParser from 'body-parser';

const app= express();
const port = 3000;
var blogs=[];

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

app.post('/search', (req,res)=>{
    var results=[];
    blogs.forEach(blog =>{
        console.log(`title is: ${blog.title}`);
        console.log(`search input is: ${req.body.searchInput}`);
        if(blog.title.toUpperCase().includes(req.body.searchInput.toUpperCase())){
            results.push(blog);
            console.log(results);
        }
    });
    res.render('homepage.ejs', {blogs:results});
})

app.get('/', (req,res)=>{
    res.render('homePage.ejs', {blogs:blogs});
});

app.get('/createNewPost', (req,res) =>{
    res.render('createNewPost.ejs');
});

app.post('/postBlog', (req,res) =>{
    let blog= {title : req.body['title'], content: req.body['content']};
    blogs.push(blog);
    res.redirect('/');
});

app.get('/viewBlog/:id', (req,res) =>{
    const id= req.params.id;
    res.render('viewBlog.ejs', {index: id, title: blogs[id].title, content: blogs[id].content});
});

app.get('/viewBlog/editBlog/:id', (req,res)=>{
    const id= req.params.id;
    res.render('editBlog.ejs', {id:id, title: blogs[id].title, content: blogs[id].content});

});

app.post('/updateBlog/:id', (req,res)=>{
    const id= req.params.id;
    let updatedBlog= {title: req.body['title'],content:req.body['content']};
    blogs[id]= updatedBlog;
    res.redirect('/viewBlog/'+String(id));
})

app.get('/viewBlog/deleteBlog/:id', (req,res)=>{
    const id= req.params.id;
    //remove blog with index= id from blogs array
    blogs.splice(id,1);
    //pop up a message that blog was successfully deleted
    console.log('item was successfully deleted!');
    res.redirect('/');
});

app.listen(port, ()=>{
    console.log(`server is up and running on port ${port}`);
});