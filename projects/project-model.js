
const db = require('../data/db-config.js');

module.exports = {
  getAllProjects,
  getAllResources,
  getAllTasks,
  addProject,
  addResource,
  getByProjectId,
  //getAllProjectsSteps,
  // remove,
};

function getAllProjects() {
  return db('projects');
};

function getAllResources() {
  return db('resources');
};

function getAllTasks() {
  return db('tasks');
};

function getByProjectId(id) {
  return db("projects").where({ id }).first();
}

function getByResourceId(id) {
  return db("resources").where({ id }).first();
}

function addProject(data) {
  return db('projects').insert(data, "id")
  .then(ids => {
    const id = ids[0];
    return getByProjectId(id);
  })
}

function addResource(data) {
  return db('resources').insert(data, "id")
  .then(ids => {
    const id = ids[0];
    return getByResourceId(id);
  })
}
