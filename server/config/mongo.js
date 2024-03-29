const mongoose = require("mongoose");
const dbName = process.env.SERVER_DB_NAME;
const dbPass = process.env.SERVER_DB_PWD;
const UNAME = process.env.UNAME;
const CL_PWD = process.env.CL_PWD;
function connectMongo() {
  try {
    var mongouri = `mongodb://127.0.0.1:27017/${dbName}:${dbPass}`; //! For Local Dev
    // var mongouri = `mongodb+srv://${UNAME}:${CL_PWD}@cluster0.gtnn56q.mongodb.net/?retryWrites=true&w=majority`; //! Heroku
    mongoose.connect(
      mongouri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
      },
      (err) => {
        if (err) console.log(err);
        else console.log("Server connected to MongoDB");
      }
    );
  } catch (e) {
    console.log(e);
  }
}
async function disconnectMongo() {
  try {
    await mongoose.connection.close();
    console.log("Server-DB connection terminated");
  } catch (error) {
    console.log(e);
  }
}
module.exports = { connectMongo, disconnectMongo };
