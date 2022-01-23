const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 4020;
const config = require("./utils/config")[process.env.NODE_ENV || "dev"];
const morgan = require("morgan");

const categoryRoutes = require("./routes/CategoryRoutes");
const productRoutes = require("./routes/ProductRoutes");

mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);

mongoose.connect(config.mongoUrl);

const conn = mongoose.connection;
conn.on("error", function (err) {
  console.log("mongoose connection error:", err.message);
});

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.options("*", cors());
app.use(cors());

app.listen(process.env.PORT || port, () => {
  console.log("Server started work on " + port);
});

app.use("/api/category", categoryRoutes); //drug categories
app.use("/api/product", productRoutes); //drug categories
