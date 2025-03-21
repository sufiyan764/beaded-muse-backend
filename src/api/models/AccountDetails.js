'use strict'

import { MONGO_MODEL } from '.'

import { ObjectId } from 'mongodb'

const retrieveCustomerDetails = async (headers)=>{
    const {email} = headers
    const accountDetails = await MONGO_MODEL.mongoFind('customers',{email:email})
    if(accountDetails){
      return {status: true, statusCode: 200, message: "User Details retrieved", data: {accountDetails}}
    }else{
      return {status:false , statusCode: 400, message: "User Does Not exist",}

    }

}


export const AccountDetailsModel = {
  retrieveCustomerDetails
}