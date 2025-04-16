'use strict'

import Express from 'express'
import { WatchTower } from '../helpers'
import { CheckoutController } from '../controllers'
import { SendResponse } from '../../lib'

const { sendResponse } = SendResponse
const CheckoutRouter = new Express.Router()

CheckoutRouter.post('/', WatchTower(CheckoutController.processCheckout))

CheckoutRouter.use(sendResponse)

export { CheckoutRouter }
