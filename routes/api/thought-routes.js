const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
} = require('../../controllers/thought-controller');

// api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)
    .put(updateThought);

// /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .get(getThoughtById);

module.exports = router;