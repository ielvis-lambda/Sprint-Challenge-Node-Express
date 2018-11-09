const express = require('express');
const projectDb = require('../data/helpers/projectModel');

const router = express.Router();

//middleware
// const upperCaseThat = require('../middleware/upperCaseThat');

//endpoints
router.get('/', async (req, res) => {
  try {
    const projects = await projectDb.get();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: " error: 'The projects could not be retrieved'", error: error });
  }
});

router.get('/api/projects/:id', async (req, res) => {
  try {
    projectDb.get().then(projects => {
      const { id } = req.params;
      const project = projects.find(project => `${project.id}` === id);

      if (!project) {
        return res.status(404).json({ message: '404 project Not Found' });
      }

      projectDb
        .get(id)
        .then(project => {
          res.status(200).json(project);
        })
        .catch(error => {
          res.status(500).json({ message: 'The project could not be retrieved' });
        });
    });
  } catch (error) {
    res.status(500).json({ message: " error: 'The projects could not be retrieved'", error: error });
  }
});

router.get('/api/projects/actions/:id', async (req, res) => {
  try {
    projectDb.get().then(projects => {
      const { id } = req.params;
      const project = projects.find(project => `${project.id}` === id);

      if (!project) {
        return res.status(404).json({ message: '404 project Not Found' });
      }

      projectDb
        .getProjectActions(id)
        .then(actions => {
          res.status(200).json(actions);
        })
        .catch(error => {
          res.status(500).json({ message: 'The project actions could not be retrieved' });
        });
    });
  } catch (error) {
    res.status(500).json({ message: " error: 'The projects could not be retrieved'", error: error });
  }
});

router.post('/api/projects/actions/:id', async (req, res) => {
  const projectData = req.body;
  console.log(req.body);
  if (!projectData.name || !projectData.description) {
    res.status(400).json({ errorMessage: 'Please provide a name and a description for your project.' });
  } else {
    try {
      const newProject = await projectDb.insert(projectData);
      res.status(201).json(newProject);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'There was an error while saving the project to the database. The error is ', error });
    }
  }
});

router.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  projectDb
    .remove(id)
    .then(deletedProject => {
      deletedProject
        ? res.status(202).json({ message: 'Project removed' })
        : res.status(404).json({ message: 'The project with the specified ID does not exist.' });
    })
    .catch(err => {
      res.status(500).json({ error: 'The project could not be removed.' });
    });
});

router.put('/api/projects/:id', async (req, res) => {
  try {
    projectDb.get().then(projects => {
      const { id } = req.params;
      const changes = req.body;
      const project = projects.find(project => `${project.id}` === id);

      if (!project) {
        return res.status(404).json({ message: '404 project Not Found' });
      } else {
        projectDb.update(id, changes);
        res.status(200).json({ message: `Project: ${project.name} has been updated` });
      }
    });
  } catch (error) {
    res.status(500).json({ message: " error: 'The projects could not be retrieved'", error: error });
  }
});

module.exports = router;
