'use strict'

import { MONGO_MODEL } from '.'
import { ObjectId } from 'mongodb'

const addAddressToUser = async ({ userId, address }) => {
  const userObjectId = new ObjectId(userId)

  const user = await MONGO_MODEL.mongoFindOne('customers', { _id: userObjectId }, { projection: { addresses: 1 } })

  if (!user) {
    return { statusCode: 404, message: "User not found" }
  }

  const addressCount = user.addresses?.length || 0
  if (addressCount >= 5) {
    return { statusCode: 400, message: "Maximum of 5 addresses allowed" }
  }

 
  address._id = new ObjectId()

  const result = await MONGO_MODEL.mongoUpdateOne(
    'customers',
    { _id: userObjectId },
    { $push: { addresses: address } }
  )

  if (result.modifiedCount > 0) {
    return { statusCode: 200, message: "Address added successfully", data: { addressId: address._id } }
  } else {
    return { statusCode: 500, message: "Failed to add address" }
  }
}

// Edit
const updateAddress = async ({ userId, addressId, newAddress }) => {
  const result = await MONGO_MODEL.mongoUpdateOneWithArrayFilter(
    'customers',
    { _id: new ObjectId(userId) },
    {
      $set: {
        "addresses.$[addr]": { ...newAddress, _id: new ObjectId(addressId) }
      }
    },
    {
      arrayFilters: [{ "addr._id": new ObjectId(addressId) }]
    }
  )

  if (result.modifiedCount > 0) {
    return { statusCode: 200, message: "Address updated successfully", data: result }
  } else {
    return { statusCode: 404, message: "Address not found or not updated" }
  }
}

// Delete
const deleteAddress = async ({ userId, addressId }) => {
  const result = await MONGO_MODEL.mongoUpdateOne(
    'customers',
    { _id: new ObjectId(userId) },
    {
      $pull: { addresses: { _id: new ObjectId(addressId) } }
    }
  )

  if (result.modifiedCount > 0) {
    return { statusCode: 200, message: "Address deleted successfully", data: result }
  } else {
    return { statusCode: 404, message: "Address not found or already removed" }
  }
}

const getAllAddresses = async ({ userId }) => {
  const user = await MONGO_MODEL.mongoFindOne(
    'customers',
    { _id: new ObjectId(userId) },
    { projection: { addresses: 1 } }
  )

  if (!user) {
    return { statusCode: 404, message: "User not found" }
  }

  const addresses = user.addresses || []

  return {
    statusCode: 200,
    message: "Addresses retrieved successfully",
    data: { addresses }
  }
}


export const AddressesModel = {
  addAddressToUser,
  updateAddress,
  deleteAddress,
  getAllAddresses
}