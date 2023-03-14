const { Test } = require("../models");
const CONSTANTS = require("../conf/CONSTANTS.js");
const ERROR = require("../conf/ERROR_CODE.js");

/**
 * 
 * @name getTest
 * @method GET
 * @url /test
 * @description Test data 를 다불러옴
 */
exports.getTest = async (req, res, next) => {
    try {
        const test = await Test.find();
        res.send(test);
    } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
};

/**
 * 
 * @name postTest
 * @method POST
 * @url /test
 * @body { name: String, age: Number }
 * @description Test를 생성하는 API
 */
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