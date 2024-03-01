"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoUri = () => {
    const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DBNAME } = process.env;
    if (!MONGO_USERNAME || !MONGO_PASSWORD || !MONGO_DBNAME) {
        console.log("Error in connecting database");
    }
    const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@mernstack-pagination.dmkoc.mongodb.net/${MONGO_DBNAME}?retryWrites=true&w=majority`;
    return uri;
};
exports.default = mongoUri;
