const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const db = require("./connection/connection");
require("dotenv").config();



const app = express();
app.use(cors());
app.use(express.json());

db.connect()

////////////////// Test Debug //////////////////////////////
app.get("/", async (req, res) => {
    res.end("OK")
})

////////////////// User Register API //////////////////////////////
app.post("/register", async (req, res) => {
    const payload = req.body;
    const userProfile = require("./model/userProfile");
    console.log(payload.contact.email);

    try {
        userAvailable = await userProfile.findOne(
            { "contact.email": payload.contact.email }
        );
        if (userAvailable) {
            res.sendStatus(200);
            console.log("Profile already create");
        } else {
            await userProfile.create(payload);
            res.sendStatus(200);
            console.log("register Profile OK");

        };
    } catch (err) {
        res.send(err);
    };
})

////////////////// User Login API //////////////////////////////
app.post("/login", async (req, res) => {
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

app.post("/writeEmotion", async (req, res) => {

    
    /*
    {
        "email": "natt@gmail.com",
        "objective": "test",
        "sentence": "1",
        "question": "wtf"
        "facial": ["sad", "sad", "sad"],
        "answer": "Hello Motherfucker"
}
    */

    const payload = req.body;
    const emotion = require("./model/emotion");

    const processSentiment = require("./modules/processSentiment")
    const countMax = require("./modules/countMax")

    const sentimentScore = await processSentiment(payload.answer)
    const maxFace = await countMax(payload.facial)

    console.log(sentimentScore)
    console.log(maxFace)

    try {
        await emotion.create({
                email: payload.email,
                metadata: {
                    objective: payload.objective,
                    sentence: payload.sentence,
                    question: payload.question
                },
                result: {
                    faceResult: maxFace,
                    voiceResult: sentimentScore,
                    answer: payload.answer
                    // topWord: [ String ]
                }
        
            })
        res.send("OK")
    } catch (err) {
        res.send(err);
    };
})

module.exports = app;