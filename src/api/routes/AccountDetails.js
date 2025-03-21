'use strict'

import Express from 'express'
import { WatchTower } from '../helpers'
import {AccountDetailsController} from '../controllers/AccountDetails'
import { SendResponse } from '../../lib'
const { sendResponse } = SendResponse

const AccountDetailsRouter = new Express.Router()

AccountDetailsRouter.get('/userDetails',WatchTower(AccountDetailsController.showAccountDetails))

AccountDetailsRouter.use(sendResponse)

export {AccountDetailsRouter}