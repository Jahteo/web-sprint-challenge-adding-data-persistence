
const db = require('../data/db-config.js');

module.exports = {
  getAllProjects,
  addProject,
  getByProjectId,
  //getAllProjectsSteps,
  // remove,
};

function getAllProjects() {
  return db('projects');
};
function getByProjectId(id) {
  return db("projects").where({ id }).first();
}

function addProject(data) {
  return db('projects').insert(data, "id")
  .then(ids => {
    const id = ids[0];
    return getByProjectId(id);
  })
}
