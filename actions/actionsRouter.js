const express = require('express');
const actionDb = require('../data/helpers/actionModel');

const router = express.Router();

//middleware
// const upperCaseThat = require('../middleware/upperCaseThat');

//endpoints
router.get('/', async (req, res) => {
  try {
    const actions = await actionDb.get();
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json({ message: " error: 'The projects could not be retrieved'", error: error });
  }
});

router.get('/api/actions/:id', async (req, res) => {
  try {
    actionDb.get().then(actions => {
      const { id } = req.params;
      const action = actions.find(action => `${action.id}` === id);

      if (!action) {
        return res.status(404).json({ message: '404 action Not Found' });
      }

      actionDb
        .get(id)
        .then(action => {
          res.status(200).json(action);
        })
        .catch(error => {
          res.status(500).json({ message: 'The action could not be retrieved' });
        });
    });
  } catch (error) {
    res.status(500).json({ message: " error: 'The actions could not be retrieved'", error: error });
  }
});

router.post('/api/actions/', async (req, res) => {
  const actionData = req.body;
  console.log(req.body);
  if (!actionData.description || !actionData.notes || !actionData.project_id) {
    res.status(400).json({ errorMessage: 'Please provide a Project ID, description and notes for your action.' });
  } else {
    try {
      const newAction = await actionDb.insert(actionData);
      res.status(201).json(newAction);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'There was an error while saving the action to the database. The error is ', error });
    }
  }
});

router.delete('/api/actions/:id', (req, res) => {
  const { id } = req.params;
  actionDb
    .remove(id)
    .then(deletedAction => {
      deletedAction
        ? res.status(202).json({ message: 'Action removed' })
        : res.status(404).json({ message: 'The action with the specified ID does not exist.' });
    })
    .catch(err => {
      res.status(500).json({ error: 'The action could not be removed.' });
    });
});

router.put('/api/actions/:id', async (req, res) => {
  try {
    actionDb.get().then(actions => {
      const { id } = req.params;
      const changes = req.body;
      const action = actions.find(action => `${action.id}` === id);

      if (!action) {
        return res.status(404).json({ message: '404 action Not Found' });
      } else {
        actionDb.update(id, changes);
        res.status(200).json({ message: `Action: ${action.description} has been updated` });
      }
    });
  } catch (error) {
    res.status(500).json({ message: " error: 'The actions could not be retrieved'", error: error });
  }
});

module.exports = router;
