'use strict'

import Express from 'express'
import { WatchTower } from '../helpers'
import { AddressesController } from '../controllers/Addresses'
import { SendResponse } from '../../lib'
const { sendResponse } = SendResponse

const AddressesRouter = new Express.Router()

AddressesRouter.post('/addAddress', WatchTower(AddressesController.addAddress))
AddressesRouter.post('/editAddress', WatchTower(AddressesController.updateAddress))
AddressesRouter.post('/deleteAddress', WatchTower(AddressesController.deleteAddress))
AddressesRouter.post('/getAddresses', WatchTower(AddressesController.getAllAddresses))
AddressesRouter.use(sendResponse)

export { AddressesRouter }
