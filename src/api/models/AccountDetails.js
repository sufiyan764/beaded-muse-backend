'use strict'

import { MONGO_MODEL } from '.'
import { ObjectId } from 'mongodb'
import { AuthHelper } from '../helpers'

const retrieveCustomerDetails = async (headers) => {
  const { email } = headers
  const accountDetails = await MONGO_MODEL.mongoFind('customers', { email }, { projection: { password: 0 } })
  if (accountDetails) {
    return { status: true, statusCode: 200, message: "User Details retrieved", data: { accountDetails } }
  } else {
    return { status: false, statusCode: 400, message: "User Does Not exist" }
  }
}

const updateCustomerDetails = async ({ userId, updates, oldPassword }) => {
  const user = await MONGO_MODEL.mongoFindOne(
    'customers',
    { _id: new ObjectId(userId) },
    { projection: { password: 1 } }
  )

  if (!user) {
    return {
      statusCode: 404,
      message: 'User not found'
    }
  }

  const updatePayload = { ...updates }

  // REMOVE fields that shouldn't be stored
  delete updatePayload.newPassword
  delete updatePayload.confirmPassword

  // Handle password update
  if (updatePayload.password) {
    if (!oldPassword) {
      return {
        statusCode: 400,
        message: 'Old password is required to update password'
      }
    }

    const isMatch = await AuthHelper.comparePassword(oldPassword, user.password)

    if (!isMatch) {
      return {
        statusCode: 401,
        message: 'Old password is incorrect'
      }
    }

    // Hash the new password
    updatePayload.password = await AuthHelper.hashPassword(updatePayload.password)
  } else {
    // If password field exists but is blank — remove it
    if (updatePayload.password === "") delete updatePayload.password
  }

  // Update timestamps
  updatePayload.updatedAt = new Date().toISOString()

  const result = await MONGO_MODEL.mongoUpdateOne(
    'customers',
    { _id: new ObjectId(userId) },
    { $set: updatePayload }
  )

  if (result.modifiedCount > 0) {
    return {
      statusCode: 200,
      message: 'Account details updated successfully'
    }
  } else {
    return {
      statusCode: 400,
      message: 'No changes made or update failed'
    }
  }
}

export const AccountDetailsModel = {
  retrieveCustomerDetails,
  updateCustomerDetails
}
