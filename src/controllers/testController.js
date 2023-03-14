const { Test } = require("../models");
const CONSTANTS = require("../conf/CONSTANTS.js");
const ERROR = require("../conf/ERROR_CODE.js");

const testController = {
    //test 관련 함수들을 작성

    /**
        * 
        * @name postTest 포스트 테스트용 함수
        * @route {POST} /test
        * @summary test를 생성한다.
        * @param {string} name.body.required - name
        * @param {number} age.body.required - age
        * 
     */
    postTest: async (req, res) => {
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
    },

    /**
        * 
        * @name getTest 테스트용
        * @route {get} /test
        * @summary 그냥 본다.
        * 
     */
    getTest: async (req, res) => {
        try {
            const test = await Test.find();
            res.send(test);
        } catch (err) {
            console.log(err);
            return res.status(500).send({ err: err.message });
        }
    }

};


module.exports = testController;