import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import { app } from "./app.js";
dotenv.config({
  path: "./env",
});

// const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(`erron on express app in index.js || ${error}`);
      throw error;
    });

    app.listen(process.env.PORT || 3000, () => {
      console.log(`app listen on port no ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.log(`mongodb connection failed on index.js file ${error}`);
    // throw error;
  });
