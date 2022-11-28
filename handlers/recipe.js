const recipe = require('../pkg/models/Recipe');

const createRecipe = async (req, res) => {
  try {
    let payload = {
      ...req.body,
      author_id: req.auth.uid,
      published_on: new Date()
    };
    let r = await recipe.create(payload);
    return res.status(201).send(r);
  } catch (error) {
    if (error) console.log(error);
    return res.status(500).send(`Bad request!`);
  }
};

const getAllRecipes = async (req, res) => {
  try {
    let recipes = await recipe.getAll();
    if (recipes.length === 0) {
      return res.status(200).send("There are no recipes created!");
    }
    return res.status(200).send(recipes);
  } catch (error) {
    if (error) console.log(error);
    return res.status(500).send(`Bad request!`);
  }
};

const getRecipe = async (req, res) => {
  try {
    let r = await recipe.getRecipe(req.params.id);
    if (r !== null) {
      return res.status(200).send(r);
    }
    return res.status(404).send("Reciept doesn't exist!");
  } catch (error) {
    if (error) console.log(error);
    return res.status(500).send(`Bad request!`);
  }
};

const updateRecipe = async (req, res) => {
  try {
    let payload = {
      ...req.body,
      author_id: req.auth.uid,
      published_on: new Date()
    }
    let up = await recipe.update(req.params.id, req.auth.uid, payload);
    if (up.modifiedCount === 0) {
      return res.status(404).send('You can only update your recipes!');
    } else {
      console.log(up)
    }
    return res.status(200).send('Recipe updated');
  } catch (error) {
    if(error) console.log(error);
    return res.status(500).send('Bad request!');
  }
};

const deleteRecipe = async (req, res) => {
  try {
    let r = await recipe.remove(req.params.id, req.auth.uid);
    console.log(r);
    if(r.deletedCount === 0) {
      return res.status(405).send('You can only delete your recipes!');
    }
    return res.status(200).send('Recipe deleted!');
  } catch (error) {
    if(error) console.log(error);
    return res.status(500).send('Bad request!');
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe
}