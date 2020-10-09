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

router.get('/resources', (req, res) => {
  Projects.getAllResources()
  .then(projects => {
    res.json(projects);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get projects' });
  });
});


module.exports = router;