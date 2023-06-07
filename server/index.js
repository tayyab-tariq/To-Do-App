const express = require('express');
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const connectDB = require('./config/db');
require("dotenv").config();


connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/task", taskRoutes);

app.get('/', (req, res) => {
    res.send('Hello, Worldsss!');
  });

const server = app.listen(process.env.PORT, ()=> {
    console.log(`Server Started on Port ${process.env.PORT}`);
});
