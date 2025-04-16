'use strict'

import Express from 'express'
import { WatchTower } from '../helpers'
import { OrderController } from '../controllers'
import { SendResponse } from '../../lib'

const { sendResponse } = SendResponse
const OrderRouter = new Express.Router()

OrderRouter.post('/', WatchTower(OrderController.processCheckout))
OrderRouter.post('/successOrder', (OrderController.successOrder))
OrderRouter.post('/getOrders', (OrderController.getOrders))

OrderRouter.use(sendResponse)

export { OrderRouter }
