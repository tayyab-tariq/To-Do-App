const express = require('express');
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
require("dotenv").config();


connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/task", taskRoutes);
app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Hello, Worldsss!');
  });

const server = app.listen(process.env.PORT, ()=> {
    console.log(`Server Started on Port ${process.env.PORT}`);
});
