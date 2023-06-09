const { User, Thought } = require('../models');

module.exports = {

  // Get all Users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Get a User
  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Could not find a User with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a User
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Delete a User
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Could not find a User with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User has been deleted.' }))
      .catch((err) => res.status(500).json(err));
  },

  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'Could not find a User with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add a Friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: { _id: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No User found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove a Friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { _id: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Could not find a User with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};