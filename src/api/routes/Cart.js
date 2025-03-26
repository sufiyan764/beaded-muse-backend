'use strict'

import Express from 'express'
import { WatchTower } from '../helpers'
import { CartController } from '../controllers/Cart'
import { SendResponse } from '../../lib'

const { sendResponse } = SendResponse
const CartRouter = new Express.Router()

CartRouter.post('/add', WatchTower(CartController.addToCart))
CartRouter.post('/edit', WatchTower(CartController.editCartItem))
CartRouter.post('/delete', WatchTower(CartController.deleteCartItem))
CartRouter.post('/view', WatchTower(CartController.viewCart))

CartRouter.use(sendResponse)

export { CartRouter }
