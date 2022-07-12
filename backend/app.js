const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express();
app.use(cors());
app.use(express.json());

////////////////// Test Debug //////////////////////////////
app.get("/", async (req, res) => {
    res.send("OK")
})


////////////////// User Register API //////////////////////////////
app.post("/register", async (req, res) => {
    const payload = req.body;
    const userProfile = require("./model/userProfile");

    try {
        userAvailable = await userProfile.findOne(
            { "contact.email": payload.contact.email }
        );

        if (userAvailable) {
            res.sendStatus(200);
            console.log("Profile already create");
        } else {
            await userInfo.create(payload);
            res.sendStatus(200);
            console.log("register Profile OK");

        };
    } catch (err) {
        res.send(err);
    };
})

////////////////// User Login API //////////////////////////////
app.post("/login", async (req, res) => {
    /* payload = {
        email: "earth@gmail.com"
    }*/
    const payload = req.body;
    const userProfile = require("./model/userProfile");

    try {
        userAvailable = await userProfile.findOne(
            { "contact.email": payload.email }
        );

        if (userAvailable) {
            res.send(userAvailable);
        } else {
            res.send("No user")
        };
    } catch (err) {
        res.send(err);
    };
})

app.post("/getDialog", async (req, res) => {
    const payload = payload
})


module.exports = app;