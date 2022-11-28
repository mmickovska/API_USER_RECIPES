const mongoose = require('mongoose');

const Recipe = mongoose.model(
  'recipe',
  {
    author_id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    ingredients: {
      type: [ String ],
      required: true
    },
    category: {
      type: String,
      required: true
    },
    cookingTime: {
      type: Number,
      required: true
    },
    published_on: {
      type: Date,
      required: true
    }
  }
);

const create = async (data) => {
  let recipe =  new Recipe(data);
  return recipe.save();
};

const getRecipe = async (id) => {
  return Recipe.findOne({ _id: id });
};

const getAll = async () => {
  return Recipe.find({}).sort({ published_on: -1 });
};

const update = async (id, uid, data) => {
  return Recipe.updateOne({_id: id, author_id: uid}, data);
};

const remove = async (id, uid) => {
  return Recipe.remove({ _id: id, author_id: uid });
};

module.exports = {
  create,
  getRecipe,
  getAll,
  update,
  remove
};