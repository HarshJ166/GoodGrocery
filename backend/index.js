const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");

// const sendMail = require("./sendMail");

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
// app.get("/mail", sendMail);

//product section

const schemaProduct = mongoose.Schema({
  product_name: String,
  category: String,
  image: String,
  price: String,
  description: String,
  product_id: Number,
  aisle_id: Number,
  department_id: Number,
});
const productModel = mongoose.model("product", schemaProduct);

async function updateImages(list) {
  try {
    // Fetch documents from the collection based on the criteria
    const products = await productModel.find();

    // Iterate over each product document
    for (let i = 16; i < products.length; i++) {
      // Modify the image URL for each product
      const updatedProduct = products[i];
      updatedProduct.image = list[updatedProduct.department_id]; // Circular indexing for images

      // Save the modified product document
      await updatedProduct.save();
      console.log(`Image updated for product ${updatedProduct.product_name}`);
    }

    console.log("All images updated successfully");
  } catch (error) {
    console.error("Error updating images:", error);
  }
}

const imageURLs = [
  "https://example.com/image1.jpg",
  "https://example.com/image2.jpg",
  "https://www.tasteofhome.com/wp-content/uploads/2018/01/Quick-Chocolate-Sandwich-Cookies_exps12928_CK133085D05_07_5bC_RMS-1.jpg",
  "https://cdn.mos.cms.futurecdn.net/iC7HBvohbJqExqvbKcV3pP-1200-80.jpg",
  "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcThdtogrPsOcQeuKm62SJPEtDkgK6_WNZ02ppcOec5gepVlso_J",

  // Add more image URLs as needed
];

const list = {
  1: "https://c.ndtvimg.com/2019-10/rgsj9oc_frozen-foods-_625x300_25_October_19.jpg",
  2: "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/vegetarian-diet-plan-1296x728-feature.jpg?w=1155&h=1528",
  3: "https://etimg.etb2bimg.com/photo/92271034.cms",
  4: "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/vegetarian-diet-plan-1296x728-feature.jpg?w=1155&h=1528",
  5: "https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL3ZpbmVnYXItdXNlcy5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOiIxMjAwIn19fQ==",
  6: "https://www.viralspices.com/wp-content/uploads/2018/07/Spices.jpg",
  7: "https://eu-images.contentstack.com/v3/assets/blta023acee29658dfc/blta9f158c45627aa62/651dbb742365a678d7ec7f18/AdobeStock_279692163_Editorial_Use_Only-Beverage-FTR-new.jpg?disable=upscale&width=1200&height=630&fit=crop",
  8: "https://www.cessnapetstore.in/pub/media/catalog/product/cache/afe255019165e4447f45946ff95a294a/6/1/61zjsdka2nl._sl1000__2.jpg",
  9: "https://4.imimg.com/data4/YB/HG/ANDROID-46803775/product-500x500.jpeg",
  10: "https://cdn-magazine.nutrabay.com/wp-content/uploads/2023/02/image7-13.png",
  11: "https://modernwomanagenda.com/wp-content/uploads/2016/08/Natural-skincare-new.jpg",
  12: "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/vegetarian-diet-plan-1296x728-feature.jpg?w=1155&h=1528",
  13: "https://www.thespruceeats.com/thmb/D45ZZGtWGoe2cMKljb9r_x3oepc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-493239254-b4ee2820e10a4230a747154c88366f86.jpg",
  14: "https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/10/fruit-salad-best-breakfast-foods-1296x728-body.jpg?w=1155&h=1528",
  15: "https://www.thespruceeats.com/thmb/U_Jl4KSukouhfsmTyvpR0A8UGx8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cannedfoodsWarren_Price-2d07bf3a98814f7b8f061e800a509627.jpg",
  16: "https://cdn.britannica.com/94/151894-050-F72A5317/Brown-eggs.jpg",
  17: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1684892024-91pN6z5C7yL.jpg?crop=1xw:1.00xh;center,top&resize=980:*",
  18: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1684892024-91pN6z5C7yL.jpg?crop=1xw:1.00xh;center,top&resize=980:*",
  19: "https://www.tastingtable.com/img/gallery/25-most-popular-snacks-in-america-ranked-worst-to-best/intro-1645492743.jpg",
  20: "https://www.tastingtable.com/img/gallery/25-most-popular-snacks-in-america-ranked-worst-to-best/intro-1645492743.jpg",
  21: "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/vegetarian-diet-plan-1296x728-feature.jpg?w=1155&h=1528",
};

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
