const { Test } = require("../models");
const CONSTANTS = require("../conf/CONSTANTS.js");
const ERROR = require("../conf/ERROR_CODE.js");

exports.createTestData = async (user) => {
    if (!user.name || !user.age) {
        return ERROR.NO_ID_OR_AGE;
    };
    const test = new Test(user);
    await test.save();

    return test;
};