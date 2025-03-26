  'use strict'

  import { MONGO_MODEL } from '.'

  import { ObjectId } from 'mongodb'
import { AuthHelper } from '../helpers'

  const retrieveCustomerDetails = async (headers)=>{
      const {email} = headers
      const accountDetails = await MONGO_MODEL.mongoFind('customers',{email:email}, {projection: {password : 0}})
      if(accountDetails){
        return {status: true, statusCode: 200, message: "User Details retrieved", data: {accountDetails}}
      }else{
        return {status:false , statusCode: 400, message: "User Does Not exist",}

      }

  }

  const updateCustomerDetails = async ({ userId, updates }) => {
    if (updates.password) {
      updates.password = await AuthHelper.hashPassword(updates.password)
    }
  
    const updateDoc = {
      $set: {
        ...updates,
        updatedAt: new Date().toISOString()
      }
    }
  
    const result = await MONGO_MODEL.mongoUpdateOne(
      'customers',
      { _id: new ObjectId(userId) },
      updateDoc
    )
  
    if (result.modifiedCount > 0) {
      return {
        statusCode: 200,
        message: 'Account details updated successfully'
      }
    } else {
      return {
        statusCode: 400,
        message: 'No changes made or user not found'
      }
    }
  }
  

  export const AccountDetailsModel = {
    retrieveCustomerDetails,
    updateCustomerDetails
  }