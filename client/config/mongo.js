import mongoose from "mongoose";
export function connectMongo() {
  try {
    const dbName = process.env.CLIENT_DB_NAME;
    const dbPass = process.env.CLIENT_DB_PWD;

    var mongouri = `mongodb://127.0.0.1:27017/${dbName}:${dbPass}`; //! For Local Dev
    // var mongouri = `mongodb+srv://${UNAME}:${CL_PWD}@cluster0.gtnn56q.mongodb.net/?retryWrites=true&w=majority`; //! Heroku
    mongoose.connect(
      mongouri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) console.log(err);
        else console.log("Client connected to MongoDB");
      }
    );
  } catch (e) {
    console.log(e);
  }
}
export async function disconnectMongo() {
  try {
    await mongoose.connection.close();
    console.log("Client-DB connection terminated");
  } catch (error) {
    console.log(error);
  }
}
