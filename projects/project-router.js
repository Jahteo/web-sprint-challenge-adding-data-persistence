const express = require('express');

const Projects = require('./project-model.js');

const router = express.Router();

//Routes
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

router.get('/', (req, res) => {
  Projects.getAllProjects()
  .then(projects => {
    res.json(projects);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get projects' });
  });
});


module.exports = router;