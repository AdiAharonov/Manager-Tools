const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3050;



// set up express

const app = express();
app.use(express.json());
app.use(cors());





app.listen(PORT, () => console.log(`The server is connected on port: ${PORT}`))

// setup mongoose

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
},
(err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
 }
);

// setup routes

app.use("/users", require("./routes/userRouter"))