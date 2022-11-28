require('dotenv').config();
const user = require('../pkg/models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const getAllUsers = async (req, res) => {
  try {
    let users = await user.getAll();
    if(users.length === 0) {
      return res.status(404).send('There are no users in the database!')
    }
    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Bad request');
  }
};

const createAccount = async (req, res) => {
  try {
    let findUser = await user.getUser(req.body.email);
    if(findUser) {
      return res.status(409).send('User with this email already exist!');
    }
    req.body.password = bcrypt.hashSync(req.body.password.trim());
    let u = await user.create(req.body);
    return res.status(201).send(u);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Bad request');
  }
};

const loginUser = async (req, res) => {
  try {
    let selectedUser = await user.getUser(req.body.email);
    if(!selectedUser) {
      return res.status(409).send('User with this email does not exist!');
    }
    if(!bcrypt.compareSync(req.body.password, selectedUser.password)) {
      return res.status(400).send(`Incorrect password`);
    }
    let payload = {
      uid: selectedUser._id,
      email: selectedUser.email,
      full_name: selectedUser.full_name
    };
    let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.status(200).send({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Bad request');
  }
};

const deleteUser = async (req, res) => {
  try {
    await user.remove(req.params.id);
    if(user.deletedCount === 0) {
      return res.status(404).send("Unable to delete. User not found!");
    }
    res.status(200).send('User deleted!');
  } catch (error) {
    console.log(error);
    return res.status(500).send('Bad request');
  }
};

module.exports = {
  getAllUsers,
  createAccount,
  loginUser,
  deleteUser
}