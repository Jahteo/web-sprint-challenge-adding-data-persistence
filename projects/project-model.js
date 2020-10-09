
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

// select t.*, pt.project_id, p.project_name, p.description as project_description
// from tasks as t
// left JOIN project_tasks as pt on pt.task_id = t.id
// left JOIN projects as p on p.id = pt.project_id
function getAllTasks() {
  return db('tasks as t')
    .leftJoin('project_tasks as pt', 'pt.task_id', '=', 't.id')
    .leftJoin('projects as p', 'p.id', '=', 'pt.project_id')
    .select('t.*', 'pt.project_id', 'p.project_name', 'p.description as project_description');
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
  console.log("project_tasksData", project_tasksData)
  return db('project_tasks').insert(project_tasksData, "id")
  // .then(ids => {
  //   const task_id = ids[0];
  //   // console.log(project_tasksData)
  //   // db('project_tasks'),insert(project_tasksData, "id")
  //   return getByTaskId(task_id);
  // })
}
