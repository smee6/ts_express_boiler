const { Router } = require("express");
const testRouter = Router();
const testController = require("../controllers/testController");

testRouter.get("/", testController.getTest);
testRouter.post("/", testController.postTest);

module.exports = { testRouter };