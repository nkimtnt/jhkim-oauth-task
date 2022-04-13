require("dotenv").config();
const User = require("../models/User");
const {generateAccessToken} = require("../middlewares/token");
const dayjs = require("dayjs");

module.exports = {
    createControl: async (req, res) => {
        try {
            const {userId, userPassword} = req.body;
            console.log(req.body)
            if (userId && userPassword) {
                const jwtToken = await generateAccessToken({userId, userPassword})
                console.log("===jwtToken===", jwtToken)
                const newUser = {
                    userId: userId,
                    userPassword: userPassword,
                    accessToken: '',
                    accessTokenExpiry: '',
                    refreshToken: '',
                    refreshTokenExpiry: '',
                    jwtToken: jwtToken,
                }
                await new User(newUser).save();
                res.status(200).send({message: "success"});
            } else {
                return res.status(400).send({message: "bad request"});
            }
        } catch (err) {
            return res.status(500).send({message: "got server problem"});
            console.log(err);
        }
    },

    deleteControl: async (req, res) => {
        try {
            const {userId, userPassword} = req.body;
            if (!userId || !userPassword) {
                return res.status(400).send({message: "bad request"})
            } else {
                const existUser = {
                    userId: userId,
                    userPassword: userPassword
                }
                const userFind = await User.find(existUser);
                console.log("===userFind===", userFind);
                const validateDate = userFind[0].refreshTokenExpiry;
                console.log("===validateDate===", validateDate)
                const today = new Date();
                const overdate = new Date(Date.parse(today) + 1209600000); // valid 확인용
                const validate = dayjs(today).isBefore(validateDate)
                if (!validate) {
                    return res.status(404).send({message: "found no user"})
                } else {
                    const userCount = await User.find(existUser).count();
                    const userDelete = await User.deleteMany(existUser);
                    return res.status(200).send({message: `${userCount} users has been removed`});
                }
            }
        } catch (err) {
            return res.status(500).send({message: "got server problem"});
            console.log(err);
        }
    }
}