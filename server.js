var marked = require('marked')
var request = require('request')
var express = require('express')
var app = express();

var ejs = require('ejs')
app.set("view engine", "ejs")

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: false
}))

var methodOverride = require('method-override')
app.use(methodOverride('_method'))

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/wiki.db');


app.get('/', function (req, res) {
    res.redirect('/articles')
});
//homepage shows all articles 
app.get('/articles', function (req, res) {
    db.all("SELECT * FROM articles;", function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var articles = data;
            console.log(articles);
        }
        res.render('index.ejs', {
            articles: articles
        });
    });
});
//shows a single article and it's corresponding author
app.get('/articles/:article_id', function (req, res) {
    var article_id = req.params.article_id;
    db.get("SELECT * FROM articles WHERE article_id =" + article_id, function (err, data1) {
        db.get("SELECT * FROM authors WHERE article_id=" + article_id, function (err, data2) {
            res.render('articles.ejs', {
                articles: data1,
                authors: data2
            });
        });
    });
});

//authors page 
app.get('/authors', function (req, res) {
    db.all("SELECT * FROM authors;", function (err, data) {
        res.render('authors.ejs', {
            authors: data
        })
    });
});

//new author
app.get("/author/new", function (req, res) {
    res.render('new_author.ejs');
});

//add author to table
app.post('/authors', function (req, res) {
    var authorName = req.body.name;
    console.log(req.body);
    db.run("INSERT INTO authors (name) VALUES (?);", function (err) {
        if (err) {
            console.log(404);
        } else {
            res.redirect('/authors');
        }
    });
});

//corresponding authors page
app.get('/author/:author_id', function (req, res) {
    var author_id = req.params.author_id;
    db.get("SELECT * FROM authors WHERE author_id=" + author_id, function (err, data1) {
        db.get("SELECT * FROM articles WHERE author_id=" + author_id, function (err, data2) {
            res.render('show_author.ejs', {
                authors: data1,
                articles: data2
            });
        });
    });
});


//Edit an article 
app.get("/articles/:id/edit", function (req, res) {
    var articleEdit = articles[parseInt(req.params.id)];
    res.render('edit.ejs', {
        articleEdit: articleEdit
    });
});
//unfinished
//update article
app.put("/article/:id", function (req, res) {

});

//add a new article
app.get('/articles/new', function (req, res) {
    res.render('new_article.ejs');
});


//unfinished    
//Add new article to articles 
app.post("/articles", function (req, res) {
    var title = req.body.title;
    var body = req.body.article_body;
    db.run("INSERT INTO articles (title, body) VALUES(?, ?);", title, body, function (err) {
        if (err) {
            console.log(404);
        } else {
            res.redirect('/articles');
        }
    });
});

app.listen(3000, function () {
    console.log("Spinning up port 3000");
});