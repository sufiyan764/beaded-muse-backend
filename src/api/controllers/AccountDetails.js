'use strict'

import { ResponseBody } from '../../lib'
import { AccountDetailsModel } from '../models/AccountDetails'

const showAccountDetails = async (request,response,next)=>{
    const {headers} = request
    const accountDetails = await AccountDetailsModel.retrieveCustomerDetails(headers)
    const responseBody = new ResponseBody(200,"User Details retrieved", accountDetails)
    response.body = responseBody
    next()
}

export const AccountDetailsController = {
  showAccountDetails
}