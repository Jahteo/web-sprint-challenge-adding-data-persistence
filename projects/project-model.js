
const db = require('../data/db-config.js');

module.exports = {
  find,
  // add,
  // findById,
  //findSteps,
  // remove,
};

function find() {
  return db('projects');
};
