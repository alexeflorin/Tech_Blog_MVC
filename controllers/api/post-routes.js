// Import modules
const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// All posts and comments

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
});

// One post with ID

router.get("/:id", async (req, res) => {
	try {
	  const postData = await Post.findByPk(req.params.id, {
		include: [
		  { model: User, attributes: ["username"] },
		  {
			model: Comment,
			include: [{ model: User, attributes: ["username"] }],
		  },
		],
	  });
	  
	  if (postData) {
		res.status(200).json({message:"No post found"});
	return;
	  }
	  res.status(404).json(postData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Create new post

// Update post

// Delete post



module.exports = router;