const { getTasks, addTask, updateTask, deleteTask } = require("../controllers/taskController");

const router = require("express").Router();

router.post("/getTasks", getTasks);
router.post("/addTask", addTask);
router.patch("/updateTask", updateTask);
router.delete("/deleteTask", deleteTask);

module.exports = router;