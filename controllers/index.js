//  Import modules and routes
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');


// Setting up the routes
router.use('/api', apiRoutes);
router.use('/', homeRoutes);


// Export the router
module.exports = router;
