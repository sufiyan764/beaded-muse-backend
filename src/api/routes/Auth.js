'use strict'

import Express from 'express'
import { WatchTower } from '../helpers'
import { AuthController } from '../controllers'
import { SendResponse } from '../../lib'
const { sendResponse } = SendResponse

const AuthRouter = new Express.Router()

AuthRouter.post('/onBoardCustomer', WatchTower(AuthController.onBoardCustomer))
AuthRouter.post('/createAdmin', WatchTower(AuthController.createAdmin))
AuthRouter.post('/login', WatchTower(AuthController.login))
AuthRouter.post('/checkCustomer', WatchTower(AuthController.checkCustomer))
AuthRouter.post('/checkAdmin', WatchTower(AuthController.checkAdmin))

AuthRouter.use(sendResponse)

export { AuthRouter }
