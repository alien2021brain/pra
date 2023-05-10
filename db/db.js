var mongoose = require('mongoose');

const Connection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('mongodb connected sucessfully');
  } catch (error) {
    console.log('Error connecting', error);
  }
};
module.exports = Connection;
