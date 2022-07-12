const mongoose = require("mongoose")

const emotion = new mongoose.Schema(
    {
        email: { type: String, required: true },
        objective: [ String ],
        faceResult: [ String ],
        voiceResult: [ String ],
        answer: [ String ]

    }, {
        timestamps: true
    }
)

module.exports = mongoose.model("emotion", emotion);