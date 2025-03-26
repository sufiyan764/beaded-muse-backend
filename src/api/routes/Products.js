'use strict'

import Express from 'express'
import { WatchTower } from '../helpers'
import { ProductsController } from '../controllers'
import { SendResponse } from '../../lib'
const { sendResponse } = SendResponse

const ProductsRouter = new Express.Router()

ProductsRouter.get('/all',WatchTower(ProductsController.showAllProducts))

ProductsRouter.get('/featured',WatchTower(ProductsController.showFeaturedProducts))

ProductsRouter.get('/detail/:productId', WatchTower(ProductsController.showProductDetails))


ProductsRouter.use(sendResponse)

export {
  ProductsRouter
}