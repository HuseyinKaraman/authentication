const express = require("express");
const db = require("./db/db.js");
const Boom = require("boom");
const cors = require("cors");
const routes = require("./routes");
const configs = require("./configs/config.js");
const swaggerUi = require("swagger-ui-express");

const app = express();
const port = process.env.APP_PORT || 5000;

configs.serverConfig.installServerConfigs();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disabled("x-powered-by");

app.use("/api", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(configs.swaggerConfig.swaggerDocs));

app.use((req, res, next) => {
    return next(Boom.notFound("This route does not exist."));
});
app.use((err, req, res, next) => {
    if (err) {
        if (err.output) {
            return res.status(err.output.statusCode || 500).json(err.output.payload);
        }

        return res.status(500).json(err);
    }
});

app.listen(port, () => {
    try {
        db.connectMongoose(
            configs.mongoDbConfig.db_uri,
            configs.mongoDbConfig.db_collection,
            configs.mongoDbConfig.db_timeout
        );
        console.log("Server is running on port " + port);
    } catch (error) {
        console.log(error);
    }
});
