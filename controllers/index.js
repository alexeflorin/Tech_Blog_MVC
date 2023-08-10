//  Import modules and routes
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home');


// Setting up the routes
router.use('/api', apiRoutes);
router.use('/home', homeRoutes);


// Export the router
module.exports = router;
