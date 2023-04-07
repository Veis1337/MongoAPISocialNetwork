const router = require('express').Router();
const {
  getThoughts,
  getOneThought,
  createThought,
  deleteThought,
  addReaction,
  removeReaction,
  updateThought,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getOneThought).delete(deleteThought).put(updateThought);

// /api/thoughts/:thoughtId/reaction/:reactionId
router.route('/:thoughtId/reaction/:reactionId').delete(removeReaction);

// /api/thoughts/:thoughtId/reaction
router.route('/:thoughtId/reaction').post(addReaction);

module.exports = router;