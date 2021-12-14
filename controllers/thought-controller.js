const { Thought } = require('../models');
const reaction = require('../models/Reaction');
const User = require('../models/User');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // create thought
    createThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },

    // update a thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    addReaction({ params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true}
        )
        .then(dbThoughtData => {
            if(dbThoughtData) {
                res.status(400).json({ message: "No thought found this id" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(500).json(err))
    },

    deleteReaction({ params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: {reactions: params.reactionId} },
            { new: true}
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;