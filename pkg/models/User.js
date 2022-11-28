const mongoose = require('mongoose');

const User = mongoose.model(
  'user',
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    full_name: {
      type: String,
      required: true
    }
  }
);

const create = async (data) => {
  let user = new User(data);
  return user.save();
};

const getUser = async (email) => {
  return User.findOne({ email: email });
};

const getAll = async () => {
  return User.find({});
};

const remove = async (id) => {
  return User.remove({ _id: id });
};

module.exports = {
  create,
  getUser,
  getAll,
  remove
};