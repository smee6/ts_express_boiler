const express = require('express')
const app = express()
const port = 7569
const path = require('path');
const mongoose = require("mongoose");
const { testRouter } = require("./routes");
const dotenv = require("dotenv");
const morgan = require('morgan');
const date = new Date();
const today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
const rfs = require('rotating-file-stream')
const helmet = require('helmet');
const { userAuth } = require("./middlewares/authUserTest");

if (process.env.NODE_ENV == "production") dotenv.config({ path: "./env/.env_production" });
else dotenv.config({ path: "./env/.env_test" });

const runServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Succesfully Connected to MongoDB");

        //보안설정
        app.use(helmet.crossOriginEmbedderPolicy());
        app.use(helmet.crossOriginResourcePolicy());
        app.use(helmet.ieNoOpen());
        app.use(helmet.noSniff());
        app.use(helmet.expectCt());
        app.use(helmet.frameguard());
        app.use(helmet.referrerPolicy());
        app.use(helmet.xssFilter());

        //express 설정
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(express.static(path.join(__dirname, 'public')));

        //로그 셋팅
        const accessLogStream = rfs.createStream(`log_${today}`, {
            path: "./logs",
        })
        app.use(morgan('combined', { stream: accessLogStream }))

        //유저 아이피나 그런것들 유효성 검증 (경로를 나중에 유저나 그런쪽으로 바꿔서 특정 라우터에만 태움)
        app.use('/', userAuth, (req, res, next) => {
            next();
        });
        //라우터 영역
        app.use("/test", testRouter);

        //초기 페이지
        app.get('/', (req, res) => {
            return res.send("/index.html");
        });

        app.listen(port, () => {
            console.log(`Server listening on port ${port}`)
        })

    } catch (err) {
        console.log(err.stack);
    }
}

//서버 실행
runServer();