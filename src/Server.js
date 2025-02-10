'use strict'

import { MongoClient } from 'mongodb'

import { MONGO_CONFIG, SERVER_CONFIG } from './config'

const { CONNECTION_URI, MONGO_DBNAME } = MONGO_CONFIG
const { PORT } = SERVER_CONFIG

export let mongoClientDB
const Server = async App => {
    try {
        console.log(`[Info] Connecting to MongoDb database`)
        const mongoClientUse = new MongoClient(CONNECTION_URI)
        await mongoClientUse.connect()

        mongoClientDB = mongoClientUse.db(MONGO_DBNAME)
        console.log(`[Info] Connected to MongoDb with database: ${MONGO_DBNAME}`)

        await App.listen(PORT)
        console.log(`[Info] Server Started Successfully! Listening on Port: ${PORT}`)

    } catch (error) {
        console.log(error)
        // Make Axios call to Crash Service
        throw error
    }
}

export default Server
