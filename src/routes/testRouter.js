const { Router } = require("express");
const testRouter = Router();
const testController = require("../controllers/testController");


testRouter.get("/", (req, res) => {
    res.send("Hello World");
});

testRouter.post("/", async (req, res) => {
    try {
        testController.postTest(req, res);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

module.exports = { testRouter };