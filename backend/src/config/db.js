const mongoose = require("mongoose");

let connection;
const connectDB = async () => {
  try {
    if(connection) return connection;
    connection = await mongoose.connect(
      process.env.mongo_connection_string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
