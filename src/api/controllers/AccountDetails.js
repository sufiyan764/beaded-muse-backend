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

const updateAccountDetails = async (request, response, next) => {
  const { userId, updates } = request.body

  if (!userId || !updates) {
    response.body = new ResponseBody(400, 'userId and updates are required', {})
    return next()
  }

  const result = await AccountDetailsModel.updateCustomerDetails({ userId, updates })

  response.body = new ResponseBody(result.statusCode, result.message, result.data || {})
  next()
}


export const AccountDetailsController = {
  showAccountDetails,
  updateAccountDetails
}