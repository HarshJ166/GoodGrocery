const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");

const sendMail = require("./sendMail");

const app = express();
const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

//mongodb connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect to Databse"))
  .catch((err) => console.log(err));

//schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  address: String,
  password: String,
  confirmPassword: String,
  image: String,
});

//
const userModel = mongoose.model("user", userSchema);

//api
app.get("/", (req, res) => {
  res.send("Server is running");
});

//sign up
app.post("/signup", async (req, res) => {
  // console.log(req.body);
  const { email } = req.body;

  userModel.findOne({ email: email }, (err, result) => {
    // console.log(result);
    console.log(err);
    if (result) {
      res.send({ message: "Email id is already register", alert: false });
    } else {
      const data = userModel(req.body);
      const save = data.save();
      res.send({ message: "Successfully sign up", alert: true });
    }
  });
});

//api login
app.post("/login", (req, res) => {
  // console.log(req.body);
  const { email } = req.body;
  userModel.findOne({ email: email }, (err, result) => {
    if (result) {
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      };

      console.log(dataSend);
      res.send({
        message: "Login is successfully",
        alert: true,
        data: dataSend,
      });
    } else {
      res.send({
        message: "Email is not available, please sign up",
        alert: false,
      });
    }
  });
});

// email
app.get("/mail", sendMail);

//product section

const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product", schemaProduct);

//save product in data
//api
app.post("/uploadProduct", async (req, res) => {
  // console.log(req.body)
  const data = await productModel(req.body);
  const datasave = await data.save();
  res.send({ message: "Upload successfully" });
});

//
app.get("/product", async (req, res) => {
  const data = await productModel.find({});
  res.send(JSON.stringify(data));
});

// routes
// app.use("/api/payments/", paymentRoutes);

app.get("/getkey", (req, res) => {
  res.status(200).json({ key: "rzp_test_opGcWDIchDi3sI" });
});

//checkout
var instance = new Razorpay({
  key_id: "rzp_test_opGcWDIchDi3sI",
  key_secret: "KFFgiWpsc6M6trhN3KB8LwUo",
});

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

app.post(`/checkout`, async (req, res) => {
  console.log("we are in checkout");
  try {
    const order = await instance.orders.create({
      amount: Number(req.body.totalPrice * 100),
      currency: "INR",
    });
    console.log(order);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.log(error);
  }
});

// payment verification
app.post(`/payment-verification`, async (req, res) => {
  console.log("we are in payment verification");
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    var expectedSignature = crypto
      .createHmac("sha256", "KFFgiWpsc6M6trhN3KB8LwUo")
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      res.send("Thank you ");
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log(error);
  }
});

//server is ruuning
app.listen(PORT, () => console.log("server is running at port : " + PORT));
