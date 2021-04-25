const Post = require("../models/post");

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/posts');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/posts', async (req, res) => {
    await Post.find({}).then(data => {
        res.send(data);
    })
})
app.post('/posts', (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let new_post = new Post({
        title: title,
        description: description
    })

    new_post.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true,
            post: req.body
        })
    })
})

app.post('/delete', (req,res) => {
    Post.findByIdAndRemove(req.body.id).then(data => {
        res.send({
            success: true,
            post: req.body
        })
    })
})

app.listen(process.env.PORT || 8081)
