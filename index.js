require("dotenv").config();
const express = require('express');
const cors = require("cors");
const app = express();
const userRouter = require("./routes/user");
const oauthRouter = require("./routes/oauth");
const DB = require("./config/config");
const router = express.Router();

app.use(express.json());

app.use(
    cors({
        origin: true,
        methods: ["GET", "POST", "DELETE", "OPTIONS"],
        credentials: true,
    })
);

DB();
app.get('/', (req, res) => {
    return res.status(200).send({message: "hello world..!!"})
});
app.use("/user", userRouter);
app.use("/oauth", oauthRouter);


app.listen(3000, function (){
    console.log('homework1 server on')
})

module.exports = router;