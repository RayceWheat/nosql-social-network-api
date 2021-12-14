const Thought = require('../models/Thought');
const reaction = require('../models/Reaction');
const User = require('../models/User');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        // .populate({
        //     path: 'user',
        //     select: '-__v'
        // })
        // .select('-__v')
        // .sort ({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
        // .populate({
        //     path: 'user', 
        //     select: '-__v'
        // })
        // .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // create thought
    createThought({ params, body }, res) {
        return Thought.create(body)
        .then(( { _id }) => {
            return User.findOneAndUpdate(
                { username: body.username},
                { $addToSet: { thoughts: _id } },
                { new: true }
            );
        })
          .then(dbUserData => {
              if (!dbUserData) {
                  res.status(400).json({ message: 'No user found with this name '});
              }
              res.json(dbUserData);
          })
          .catch(err => res.json(err));
    },

    // update a thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete a thought by id 
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(400).json({ message: 'No thought found with this id.' });
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
            { new: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(400).json({ message: "No thought found this id" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(500).json(err))
    },

    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: {reactions: { reactionId: params.reactionId} } },
            { new: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thoughts with this particular id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = thoughtController;