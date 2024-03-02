import express from "express";
import cors from "cors";
import { MulterError } from "multer";
import Boom from "boom";
import swagger from "swagger-ui-express";
import config from "./configs/config.js";
import { connectMongoose } from "./db/db.js";
import routes from "./routes/index.js";

const app = express();
const port = process.env.APP_PORT || 5000;

config.serverConfig.installServerConfigs();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disabled("x-powered-by");

app.use("/api", routes);
app.use("/api-docs", swagger.serve, swagger.setup(config.swaggerConfig));

app.use((req, res, next) => {
    return next(Boom.notFound("This route does not exist."));
});
app.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof MulterError) {
        res.status(400).send("Error uploading file: " + err.message);
    } else if (err) {
        if (err.output) {
            return res.status(err.output.statusCode || 500).json(err.output.payload);
        }

        return res.status(500).json(err);
    }
});

app.listen(port, () => {
    try {
        connectMongoose(
            config.mongoDbConfig.db_uri,
            config.mongoDbConfig.db_collection,
            config.mongoDbConfig.db_timeout
        );
        console.log("Server is running on port " + port);
    } catch (error) {
        console.log(error);
    }
});
