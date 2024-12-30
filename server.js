require("dotenv").config();
require("./config/database");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
//------------------------Models-------------------------------------
const Food = require("./models/food.js");
const app = express();
//----------------------MIDDLEWARE-------------------------------------
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true })); // we need to ad this to use the boolean things
//------------------ROUTES-----------------------------------------
app.get("/", async (req, res) => {
  res.render("index.ejs");
});
// GET /foods/new
app.get("/foods/new", (req, res) => {
  res.render("foods/new.ejs");
});
app.get("/foods/:fruitId", async (req, res) => {
  const foodId = req.params.foodId;
  const food = await Food.findById(foodId);
  res.render("foods/show.ejs", { food: food });
});

app.get("/foods/:FoodId/edit", async (req, res) => {
  const foundFood = await Food.findById(req.params.foodId);
  res.render("foods/edit.ejs", {
    food: foundFood,
  });
});


app.delete("/foods/:foodId", async (req, res) => {
  const foodId = req.params.foodId;
  await Food.findByIdAndDelete(req.params.foodId);
  res.redirect("/foods");
});

//POST- it will create/add the foods 
//Redirect you add the /, the render dont add the slash at the begining
app.post("/foods", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  await Food.create(req.body);
  res.redirect("/foods/new");
});
// GET /foods
app.get("/foods", async (req, res) => {
  const allFoods = await Food.find();
  res.render("foods/index.ejs", { foods: allFoods });
});


// POST /foods
app.post("/foods", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  await Food.create(req.body);
  res.redirect("/foods");
});








app.listen(3000, () => {
  console.log("Listening on port 3000");
});











