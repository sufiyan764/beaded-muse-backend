'use strict'
const env = {
    APP_NAME: "Beaded Muse",
    BODY_LIMIT: "50mb",
    CORS_METHODS: "GET,PUT,PATCH,POST,DELETE",
    CORS_ORIGIN: "*",
    NODE_ENV: "dev",
    PORT: "3000",
    PARAMETER_LIMIT: "1000",
    SERVICE_NAME: "Test",
    VERSION: "1.0.0",
    SALT_ROUNDS: 10,
    JWT_SECRET: "test123",
    JWT_EXPIRY: "1d",
    CRYPTOGRAPHY_ALGO: "aes-256-cbc",
    JWT_EPOCH: "1679295268000"
}
const {
    APP_NAME,
    BODY_LIMIT,
    CORS_METHODS,
    CORS_ORIGIN,
    NODE_ENV,
    PORT,
    PARAMETER_LIMIT,
    SERVICE_NAME,
    VERSION,
    SALT_ROUNDS,
    JWT_SECRET,
    JWT_EXPIRY,
    CRYPTOGRAPHY_ALGO,
} = env

const SERVER_CONFIG = {
    APP_NAME,
    BODY_LIMIT,
    CORS_METHODS,
    CORS_ORIGIN,
    NODE_ENV,
    PORT,
    PARAMETER_LIMIT,
    SERVICE_NAME,
    VERSION,
    SALT_ROUNDS,
    JWT_SECRET,
    JWT_EXPIRY,
    CRYPTOGRAPHY_ALGO,
    JWT_START_EPOCH: parseInt(env.JWT_EPOCH)
}
// Terminate Server if any Cache Configuration is missing
Object.keys(SERVER_CONFIG).forEach((key) => {
    if (!SERVER_CONFIG[key]) {
        console.error('[Error] Missing SERVER Config:', key)
        return process.exit(1)
    }
})

export { SERVER_CONFIG }
