const express = require("express");
const server = express();
const cors = require('cors')
const mongoose = require('mongoose');

require('dotenv').config();
const port = process.env.PORT;
// const port = 8080;

const cookieParser = require('cookie-parser');

server.use(cookieParser());

const productsRouter = require("./routes/Products");
const brandsRouter = require("./routes/Brands");
const categoriesRouter = require("./routes/Categories");
const usersRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Order");

//middlewares 

// server.use(cors({
//   exposedHeaders: ['X-Total-Count']
// }))

// server.use(cors({
//   origin: ["https://shop-in-chi.vercel.app", "https://shop-in-chi.vercel.app/"], // Your React app's URL
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allowed HTTP methods
//   credentials: true, // Allow cookies if needed
//   exposedHeaders: ['X-Total-Count']
// }));

server.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://shop-in-chi.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
  exposedHeaders: ["X-Total-Count"]
}));

server.use(express.json()); // to parse req.body

//routing 
server.use('/brands', brandsRouter.router);
server.use('/products', productsRouter.router);
server.use('/categories', categoriesRouter.router);
server.use('/users', usersRouter.router);
server.use('/auth', authRouter.router);
server.use('/cart', cartRouter.router);
server.use('/orders', ordersRouter.router);


async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}

main().catch(err => console.log(err));

server.get('/', (req, res) => {
  res.json({ status: true });
})

server.listen(port, () => {
  console.log(`started on ${port}`);
})

