const mongoose = require('mongoose')
exports.connectMongoose = async (uri,collectionName, timeout) => {
    try {
        await mongoose.connect(`mongodb://${uri}`, {
            // connectTimeoutMS: timeout,
            // minPoolSize: 10,
            // maxPoolSize: 100,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        console.log("Connected to MongoDB :)")
    } catch (error) {
        throw new Error("Cannot Connect to MongoDB!")
    }
}