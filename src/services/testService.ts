const { Test } = require("../models");
const CONSTANTS = require("../conf/constant");
const ERROR = require("../conf/error");

exports.getTestData = async () => {
    const test = await Test.find();
    return test;
};

exports.createTestData = async (user) => {
    if (!user.name || !user.age) {
        return ERROR.NO_ID_OR_AGE;
    };
    const test = new Test(user);
    await test.save();

    return test;
};

