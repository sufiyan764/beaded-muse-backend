'use strict'

const env = {
    MONGO_DBNAME: "beaded-muse",
    MONGO_USERNAME: "beadedmuse764",
    MONGO_HOST: "cluster0.sojf5.mongodb.net",
    MONGO_PORT: "27017",
    MONGO_PASSWORD: "capstone1",
}

const {
    MONGO_DBNAME,
    MONGO_USERNAME,
    MONGO_HOST,
    MONGO_PORT,
    MONGO_PASSWORD,
} = env

const OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}

let CONNECTION_URI = '';

if (MONGO_USERNAME) {
    CONNECTION_URI = `mongodb+srv://${encodeURIComponent(MONGO_USERNAME)}:${encodeURIComponent(MONGO_PASSWORD)}@${MONGO_HOST}/${MONGO_DBNAME}?retryWrites=true&writeConcern=majority`;
} else {
    CONNECTION_URI = `mongodb://localhost:${MONGO_PORT}`;
} // MONGO Connection URI

const MONGO_CONFIG = {
    MONGO_DBNAME,
    OPTIONS,
    CONNECTION_URI
}

export { MONGO_CONFIG }
