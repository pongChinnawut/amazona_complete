import express from "express";
import data from "./data";
import dotenv from "dotenv";
import config from "./config";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connect DB successed!!"))
  .catch((err) => console.log(err.message));

const app = express();
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

// app.get("/api/products", (req, res) => {
//   // console.log(data);
//   // console.log(data.products);
//   res.send(data.products);
// });

// app.get("/api/products/:id", (req, res) => {
//   const productId = req.params.id;
//   const product = data.products.find((x) => x._id === productId);
//   if (product) res.send(product);
//   else res.status(404).send({ msg: "Product Not Found" });
// });

app.listen(5000, () => console.log("Server startes at port 5000"));
