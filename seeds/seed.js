
const userSeed = require ('./userSeed');
const postSeed = require ('./postSeed');
const commentSeed = require ('./commentSeed');


// Calling the sequelize connection
const sequelize = require('../config/connection');


// const { User, Project } = require('../models');

// const userData = require('./userData.json');
// const projectData = require('./projectData.json');

// Function to seed Database by calling the three seed functions in sequence
const seedDatabase = async () => {

 // Syncing the sequelize models and wiping out the tables
  await sequelize.sync({ force: true });

  // await userSeed ();
  // await postSeed ();
  // await commentSeed ();

// Exiting the process with a successful exit code
  process.exit(0);
};

// Calling seedDatabase function to seed the database
seedDatabase();

