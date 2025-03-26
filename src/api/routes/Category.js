'use strict'

import Express from 'express'
import { WatchTower } from '../helpers'
import { CategoryController } from '../controllers'
import { SendResponse } from '../../lib'
const { sendResponse } = SendResponse

const CategoryRouter = new Express.Router()

CategoryRouter.get('/',WatchTower(CategoryController.showAllCategories))

CategoryRouter.use(sendResponse)

export {
   CategoryRouter
}