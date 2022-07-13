const mongoose = require("mongoose");
const MONGO_URI = "mongodb://root:root@database:27017/hdt"

exports.connect = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authSource: 'admin',
        auth: { username: 'root', password: 'root' },
        driverInfo: { name: 'Mongoose', version: '6.2.1' }
    })
    .then(() => {
        console.log("connected to database")
    })
    .catch((error) => {
        console.log("error Database connecting")
        console.error(error)
        process.exit(1)
    });
}