const express = require('express');

const Projects = require('./project-model.js');

const router = express.Router();

//Routes
//post a new project
router.post("/", (req, res) => {
  const projectData = req.body;
  Projects.addProject(projectData)
    .then(project => {
      res.status(201).json({ created: project });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new project" });
    });
});

//post a new resource
router.post("/:id/resource", (req, res) => {
  req.body.project_id = req.params.id;
  Projects.addResource(req.body)
    .then(resource => {
      res.status(201).json({ created: resource });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new resource" });
    });
});

//post a new task
router.post("/:id/tasks", (req, res) => {
  const project_id = req.params.id;
  Projects.addTask(req.body)
    .then(task => {
      const task_id = task.id
      // console.log(req.body)
      res.status(201).json({ created: task });
      Projects.addProjectTask(project_id, task_id)
    })
    .catch(err => {
      console.log(req.body)
      res.status(500).json({ message: "Failed to create new task" });
    });
});

//get all projects
router.get('/', (req, res) => {
  Projects.getAllProjects()
  .then(projects => {
    res.json(projects);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get projects' });
  });
});

//get all resources
router.get('/resources', (req, res) => {
  Projects.getAllResources()
  .then(projects => {
    res.json(projects);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get projects' });
  });
});

//get all tasks
router.get('/tasks', (req, res) => {
  Projects.getAllTasks()
  .then(tasks => {
    res.json(tasks);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get tasks' });
  });
});


module.exports = router;