const { Router } = require("express")
const { roleMiddleware, adminOnly, loginCheck } = require("../middlewares/auth")
const { createTask, getTasks, updateTaskStatus, deleteTask, updateTask } = require("../controllers/task.controller")

const route = Router()

route.post("/", loginCheck, roleMiddleware("admin", "manager"), createTask)
route.get("/", loginCheck, getTasks)

// admin & manager
route.put("/:id", loginCheck, roleMiddleware("admin", "manager"), updateTask);

// admin only
route.delete("/:id", loginCheck, adminOnly, deleteTask);

// user update status
route.patch("/status/:id", loginCheck, roleMiddleware("user"), updateTaskStatus);

module.exports = route