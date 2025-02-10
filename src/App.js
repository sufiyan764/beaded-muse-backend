'use strict'

import Express from 'express'
import mongoSanitize from 'express-mongo-sanitize'
import cors from 'cors'
import helmet from 'helmet'

import Routes from './api/routes'
import { SERVER_CONFIG } from './config'
import server from './Server'


const { BODY_LIMIT, CORS_ORIGIN, CORS_METHODS, PARAMETER_LIMIT } = SERVER_CONFIG

const App = new Express()
const corsOptions = { origin: CORS_ORIGIN, methods: CORS_METHODS }
// Middleware Initializations

App.use(helmet())
App.disable('etag')
App.use(cors(corsOptions))
App.use(Express.json({ limit: BODY_LIMIT }))
App.use(Express.urlencoded({ limit: BODY_LIMIT, extended: true, parameterLimit: PARAMETER_LIMIT }))
// data sanitization against NOSql query injection
App.use(mongoSanitize())
// Initialize Routes
Routes.init(App)
// Start Server
server(App)
