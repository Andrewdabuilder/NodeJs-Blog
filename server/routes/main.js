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

    const data = await Post.aggregate([ { "$sort": { createdAt: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    const count = await Post.count;
    const nextPage = parseInt(page) +1;
    const hasnextPage = nextPage <= Math.ceil(count/ perPage);


    try{
        // const data = await Post.find();
        res.render('index', { locals,
             data,
             current: page,
             nextPage: hasnextPage ? nextPage : null,
             currentRoute: '/'
            });


    } catch (error){
        console.log(error);
    }

});





router.get('/about', (req,res) => {
    res.render('about', {
        currentRoute: '/about'
        
    });
});


router.get('/contact', (req,res) => {
    res.render('contact', {
        currentRoute: '/contact'
        
    });
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

router.get('/post/:id', async (req,res) => {
    try{
       

        let slug = req.params.id;
    
        const data = await Post.findById( { _id: slug } );

        const locals = {
            title: data.title,
            description: "Simple Blog created with NodeJS",
            currentRoute: `/post/${slug}`
        }
        res.render('post', { locals, data, currentRoute: `/post/${slug}` });


    } catch (error){
        console.log(error);
    }

});

// Post
// Post Search

router.post('/search', async (req,res) => {
    
    try{
        const locals = {
            title: "Search",
            description: "Search the site"
        }
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

        const data = await Post.find({
            $or:[
                {title: {$regex: new RegExp(searchNoSpecialChar, 'i')}},
                {body: {$regex: new RegExp(searchNoSpecialChar, 'i')}}
            ]
        });
    
        //const data = await Post.findById( { _id: slug } );

        
        res.render("search",{
            data,
            locals
        });


    } catch (error){
        console.log(error);
    }

});


module.exports = router;