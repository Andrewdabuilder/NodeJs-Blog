const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


// Routes



router.get('', async (req,res) => {
    const locals = {
        title: "NodeJS Blog",
        description: "Simple Blog created with NodeJS"
    }

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    const count = await Post.count;
    const nextPage = parseInt(page) +1;
    const hasnextPage = nextPage <= Math.ceil(count/ perPage);


    try{
        const data = await Post.find();
        res.render('index', { locals,
             data,
             current: page,
             nextPage: hasnextPage ? nextPage : null 

            });


    } catch (error){
        console.log(error);
    }

});





router.get('/about', (req,res) => {
    res.render('about');

});


// function insertPostData () {
//     Post.insertMany([
//         {
//             title: "Building a Blog",
//             body: "This is the body text"

//     },
//     ])


// }
// insertPostData();



module.exports = router;