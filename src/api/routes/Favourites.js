'use strict'

import Express from 'express'
import { WatchTower } from '../helpers'
import {FavouritesController} from '../controllers/Favourites'
import { SendResponse } from '../../lib'
const { sendResponse } = SendResponse

const FavouritesRouter = new Express.Router()

FavouritesRouter.post('/addFavourites', WatchTower(FavouritesController.addFavourites) )
FavouritesRouter.post('/getFavourites',WatchTower(FavouritesController.getFavourites))
FavouritesRouter.post('/deleteFavourites',WatchTower(FavouritesController.deleteFavourites))

FavouritesRouter.use(sendResponse)

export {FavouritesRouter}