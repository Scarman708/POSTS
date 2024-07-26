const express = require("express");
const path = require("path");
const app = express();
const { v4: uuidv4 } = require('uuid');
const meathodOverride = require("method-override");
const { request } = require("http");

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(meathodOverride('_method'));

const port = 3000;

app.listen(port, () => {
    console.log(`listining on port ${port}`);
})
// to check
app.get("/", (req, res) => {
    res.send('<h1>server is up!!!</h1>');
})



let data = [
    { uuid: uuidv4(), username: 'user1', content: 'Why dont scientists trust atoms? Because they make up everything!' },
    { uuid: uuidv4(), username: 'user2', content: 'I told my wife she was drawing her eyebrows too high. She looked surprised.' },
    { uuid: uuidv4(), username: 'user3', content: 'I threw a boomerang a few years ago. I now live in constant fear.' },
    { uuid: uuidv4(), username: 'user4', content: 'Parallel lines have so much in common. Its a shame theyll never meet.' },
    { uuid: uuidv4(), username: 'user5', content: 'Why dont skeletons fight each other? They dont have the guts.' },
    { uuid: uuidv4(), username: 'user6', content: 'I used to play piano by ear, but now I use my hands.' },
    { uuid: uuidv4(), username: 'user7', content: 'I told my computer I needed a break, and now it wont stop sending me Kit-Kats.' },
    { uuid: uuidv4(), username: 'user8', content: 'Why did the scarecrow win an award? Because he was outstanding in his field!' },
    { uuid: uuidv4(), username: 'user9', content: 'I used to be a baker, but I couldnt make enough dough.' },
    { uuid: uuidv4(), username: 'user10', content: 'What do you call fake spaghetti? An impasta!' }
];

//render all posts
app.get("/post", (req, res) => {
    res.render('index', { data: data });
})

// render form
app.get("/post/new", (req, res) => {
    res.render('new');
})


//new post get request
app.post("/post", (req, res) => {
    let { username, content } = req.body;

    if (username && content) {
        let newPost = { uuid: uuidv4(), username, content };
        data.push(newPost);
    }
    res.redirect('/post');
})

// for showing details
app.get("/post/:uuid", (req, res) => {
    let uuid = req.params.uuid;
    // console.log(req.params);
    let posts = data.filter(post => post.uuid === uuid);
    // console.log(posts);
    res.render('show', { posts: posts });
})

// update the post

// app.patch("/post/:uuid",(req,res)=>
// {
//     let {uuid}= req.params.uuid;
//     let new_content=req.body.content;
//     let post = data.find((p)=> uuid === p.uuid);
//     data.content=new_content;
// })


app.patch("/post/:uuid", (req, res) => {
    let uuid = req.params.uuid;
    // console.log(req.params);
    let posts = data.filter(post => post.uuid === uuid);
    // console.log(posts);
    res.render('show', { posts: posts });
});



//get req to update 


// app.get("/post/edit/:id", (req, res) => {
//     // Extract UUID from route parameters
//     let uuid = req.params.id;
//     // console.log("Requested UUID:", uuid);

//     // Find the post with the matching UUID
//     let post = data.find(p => p.uuid === uuid);
//     // console.log("Found Post:", post);

//     // Check if the post was found
//     // if (post) {
//     res.render('edit', { post: post });
//     //} else {
//     res.status(404).send('Post not found');
//     //}
// });



// app.patch("/post/edit/:id", (req, res) => {
//     let uuid = req.params.uuid;
//     console.log(req.params);
//     let new_content = req.body.content;
//     let posts = data.filter(post => post.uuid === uuid);
//     console.log(posts);
//     posts.content = new_content;
//     console.log(new_content);

//     res.redirect('/post');

// });


app.patch("/post/edit/:uuid", (req, res) => {
    let uuid = req.params.uuid;
    let newContent = req.body.content;

    // Find the index of the post to update
    const postIndex = data.findIndex(post => post.uuid === uuid);

    if (postIndex !== -1) {
        // Update the content of the post
        data[postIndex].content = newContent;
        res.redirect(`/post`); // Redirect to the updated post page
    } else {
        res.status(404).send('Post not found');
    }
});


app.get("/post/edit/:uuid", (req, res) => {
    let uuid = req.params.uuid;
    let post = data.find(p => p.uuid === uuid);

    if (post) {
        res.render('edit', { post: post });
    } else {
        res.status(404).send('Post not found');
    }
});


app.delete("/post/:uuid", (req,res)=>{
    let uuid = req.params.uuid;
   
    data = data.filter(p => p.uuid !== uuid);
    res.redirect(`/post`);

})

