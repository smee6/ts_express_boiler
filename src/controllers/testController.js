const { Test } = require("../models");
const CONSTANTS = require("../conf/CONSTANTS.js");
const ERROR = require("../conf/ERROR_CODE.js");

exports.postTest = async (req, res, next) => {
    try {
        const { name, age } = req.body;
        if (!name || !age) {
            return res.status(400).send(ERROR.NO_ID_OR_AGE);
        }
        const test = new Test(req.body);
        await test.save();
        res.send(test);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
};