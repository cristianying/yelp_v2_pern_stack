const router = require("express").Router();
const db =require("../db/index.js");


// get all restaurants
router.get("/", async (req, res) => {
    try {
      const results = await db.query(
          "select * from restaurants left join (select restaurant_id as rest_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.restaurant_id = reviews.rest_id;");
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
  router.get("/:id", async (req, res) => {
    try {
      // sql injections protection
      const restaurant = await db.query(
        "select * from restaurants left join (select restaurant_id as rest_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.restaurant_id = reviews.rest_id where restaurants.restaurant_id = $1;",
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
  router.post("/", async (req, res) => {
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
  router.put("/:id", async (req, res) => {
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
  router.delete("/:id", async (req, res) => {
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
  router.post("/:id/addReview", async (req, res) => {
    console.log(req.body)
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

  module.exports= router;