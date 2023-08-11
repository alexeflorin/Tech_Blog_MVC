
// Import modules
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// CREATE new comment
router.post('/', withAuth, async (req, res) => {
	try {
	  const newComment = await Comment.create({
		...req.body,
		user_id: req.session.user.id
	  });
  
	  req.session.save(() => {
		req.session.loggedIn = true;
  
		res.status(200).json(newComment);
	  });
	} catch (err) {
		res.status(400).json(err);
	}
  });

  module.exports = router;
  