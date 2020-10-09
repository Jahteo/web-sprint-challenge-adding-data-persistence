
const db = require('../data/db-config.js');

module.exports = {
  getAllProjects,
  getAllResources,
  getAllTasks,
  addProject,
  addResource,
  addTask,
  addProjectTask,
  getByProjectId,
  getByResourceId,
  getByTaskId,
  // remove,
  //update
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

function getByTaskId(id) {
  return db("tasks").where({ id }).first();
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

function addTask({ task_name, description, completed, notes, project_id }) {
  const taskData = { task_name, description, completed, notes }
  return db('tasks').insert(taskData, "id")
  .then(ids => {
    const task_id = ids[0];
    // const project_tasksData = { project_id, task_id }
    // console.log(project_tasksData)
    // db('project_tasks'),insert(project_tasksData, "id")
    return getByTaskId(task_id);
  })
}

function addProjectTask( project_id, task_id ) {
  const project_tasksData = { project_id, task_id }
  return db('project_tasks').insert(project_tasksData, "id")
  // .then(ids => {
  //   const task_id = ids[0];
  //   // console.log(project_tasksData)
  //   // db('project_tasks'),insert(project_tasksData, "id")
  //   return getByTaskId(task_id);
  // })
}
