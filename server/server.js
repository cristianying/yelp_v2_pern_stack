require("dotenv").config();
const express = require("express");
const cors = require("cors");
// import the db object
const db = require("./db");
const app = express();

// used to allow different sites to call our api
app.use(cors());
// middle ware is just a function between the request and response
// must call next to pass it to the next handler
app.use(express.json());

//reigster and login routes
app.use("/auth", require("./routes/jwtAuth"));

// restaurants routes
app.use("/api/v1/restaurants", require("./routes/restaurants"));


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
