require('dotenv').config();
const mongoose = require('mongoose');

const init = () => {
  const dsn = process.env.DB_CONNECT

  mongoose.connect(
    dsn,
    err => {
      if(err) {
        return console.log('Could not connect to db', err);
      }
      console.log('Successfully connected to db');
    }
  );
};

module.exports = {
  init
}