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

// get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query(
        "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.restaurant_id = reviews.restaurant_id;");
    // console.log(results.rows);
    res.status(200).json({
      status: "Success",
      data: {
        restaurants: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    // sql injections protection
    const restaurant = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.restaurant_id = reviews.restaurant_id where restaurants.restaurant_id = $1;",
      [req.params.id]
    );

    const reviews = await db.query(
      "select * from reviews where restaurant_id = $1",
      [req.params.id]
    );

    // console.log(restaurant.rows[0]);
    res.status(200).json({
      status: "Success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// create restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    // sql injections protection
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );

    // console.log(results.rows[0]);
    res.status(200).json({
      status: "Success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// update restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    // sql injections protection
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where restaurant_id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );

    // console.log(results.rows[0]);
    res.status(200).json({
      status: "Success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// delete restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    // sql injections protection
    const results = await db.query(
      "DELETE FROM restaurants WHERE restaurant_id = $1",
      [req.params.id]
    );

    // console.log(results.rows[0]);
    res.status(200).json({
      status: "Success",
    });
  } catch (err) {
    console.log(err);
  }
});

// add review
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );

    console.log(newReview.rows[0]);
    res.status(200).json({
      status: "Success",
      data: {
        review: newReview.rows[0]
      }
    });

  } catch (error) {console.log(error);}
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
