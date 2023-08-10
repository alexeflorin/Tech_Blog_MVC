// Import the packages we need
const router = require('express').Router();
const{ Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');
const serialized = require('../config/connection');




// Route to get the homepage and the all the posts associated with the users
router.get('/', async (req, res) => {
  try {
    
// Get all users posts  and JOIN with user data
const findPostData = await Post.findAll ({
include: [
  {
    model: User,
    attributes: ['username'],
  },
],
});

    // Serialize data so the template can read it - convert findPostData to JS object
    const posts = findPostData.map((post) => post.get({ plain: true }));


    // Get the homepage
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in 
    });
  } catch (err) {

    // Return error if there is any with status 500
    res.status(500).json(err);
  }
});






// Use withAuth middleware to prevent access to route
// Route to the user posted page
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    // Find post by id 
    const postedData = await Post.findByPk (req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['username'],
        },
      ],
    });
    // Convert result data into plain javascript object
    const post = postedData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});






// Route to the dashboard for the user and created posts

router.get('/dashboadr', withAuth, async (req, res) => {
  try {
    // Find posts for the logged in user

    const postData = await Post.findAll({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post)=> post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('dashboard', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to either sign up or sign in

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});



router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});




// Route to create a new blog post
router.get('/newpost', (req,res) => {
  if (req.session.logged_in) {
    res.redirect ('newpost');
    return;
  }

  res.redirect('/login');
})



// WHEN I click on one of my existing posts in the dashboard
// THEN I am able to delete or update my post and taken back to an updated dashboard
// WHEN I click on the logout option in the navigation
// THEN I am signed out of the site
// WHEN I am idle on the site for more than a set time
// THEN I am able to view posts and comments but I am prompted to log in again before I can add, update, or delete posts


module.exports = router;
