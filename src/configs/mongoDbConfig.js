import serverConfig from "./serverConfig.js";
serverConfig.installServerConfigs();

const mongoDbConfig = {
    db_uri: process.env.MONGO_DB_URI,
    db_host: process.env.MONGO_DB_HOST,
    db_port: process.env.MONGO_DB_PORT,
    db_collection: process.env.MONGO_DB_COLLECTION,
    db_timeout: 5000,
};

export default mongoDbConfig;
