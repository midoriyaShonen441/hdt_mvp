const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const db = require("./connection/connection");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

db.connect()

////////////////// Test Debug //////////////////////////////
app.get("/", async (req, res) => {
    res.end("OK")
})

////////////////// User Register API //////////////////////////////
app.post("/register", async (req, res) => {
    const payload = req.body;
    // console.log(payload)
    const userProfile = require("./model/userProfile");
    // console.log(payload.contact.email);

    try {
        userAvailable = await userProfile.findOne(
            { "contact.email": payload.contact.email }
        );
        if (userAvailable) {
            const warpText = {
                isError: true,
                text: "Profile already create"
            }
            res.send(warpText)
            // res.sendStatus(200);
            // console.log("Profile already create");
        } else {
            await userProfile.create(payload);
            const warpText = {
                isError: false,
                text: "Register success!"
            }
            res.send(warpText);
            // res.sendStatus(200);
            // console.log("register Profile OK");

        };
    } catch (err) {
        console.log(err)
        res.sendStatus(503)
    };
})

////////////////// User Login API //////////////////////////////
app.post("/login", async (req, res) => {
    const payload = req.body;
    // console.log("login payload ==> ",payload.email);
    const userProfile = require("./model/userProfile");

    try {
        userAvailable = await userProfile.findOne(
            { "contact.email": payload.email }
        );

        // console.log("userAvailable ===> ",userAvailable)

        if (userAvailable) {
            const replyData = {
                isError: false,
                email: userAvailable.contact.email,
                isFirstTime: userAvailable.isFirstTime
            }
            res.send(replyData);
        } else {
            const replyData = {
                isError: true,
                text: "Not found this email.",
            }

            res.send(replyData);
        };
    } catch (err) {
        res.sendStatus(503);
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
    console.log("payload ===> ",payload)
    const emotion = require("./model/emotion");
    try {
        const processSentiment = require("./modules/processSentiment")
        const countMax = require("./modules/countMax")

        const sentimentScore = await processSentiment(payload.answer)
        const maxFace = await countMax(payload.facial)

        console.log(sentimentScore)
        console.log(maxFace)

    
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
        console.log(err);
        res.send(err);
    };
})

module.exports = app;