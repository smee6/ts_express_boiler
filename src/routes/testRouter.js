const { Router } = require("express");
const testRouter = Router();
const testController = require("../controllers/testController");


testRouter.get("/", (req, res) => {
    res.send("Hello World");
});

testRouter.post("/", testController.postTest);

module.exports = { testRouter };