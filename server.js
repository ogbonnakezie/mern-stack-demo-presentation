//import npm packages
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080; // step 1 Heroku

const routes = require("./routes/api");

// const MONGODB_URL =
//   "mongodb+srv://Ke_zie:Merrychristmas@youtubedb.m6nzn.mongodb.net/<dbname>?retryWrites=true&w=majority";
//(MONGODB_URL ||
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/mern_youtube",
  {
    // Step 2 Heroku
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!");
});

// Data Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Saving data to our Youtube Channel
// const data = {
//   title: "Welcome to my Youtube Channel",
//   body:
//     "I help folks become a fullstack developers, and vlog about my software engineering day",
// };

//Merrychristmas password

// const newBlogPost = new BlogPost(data); //instance of the Model

// newBlogPost.save((error) => {
//   if (error) {
//     console.log("Oops, something happened");
//   } else {
//     console.log("Data has been saved!!");
//   }
// });

//.save();

// HTTP request logger

app.use(morgan("tiny"));
app.use("/api", routes);

//Routes

//Step3 Herokuc
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
