const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        userId: {
            type: String,
        },
        userPassword: {
            type: String,
        },
        accessToken: {
            type: String,
        },
        accessTokenExpiry: {
            type: String,
        },
        refreshToken: {
            type: String,
        },
        refreshTokenExpiry: {
            type: String,
        },
        jwtToken: {
            type: String,
        },
    },
    {timestamps: true},
);

module.exports = mongoose.model("User", userSchema);