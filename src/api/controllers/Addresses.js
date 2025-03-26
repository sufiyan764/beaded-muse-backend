'use strict'

import { ResponseBody } from '../../lib'
import { AddressesModel } from '../models/Addresses'

const addAddress = async (request, response, next) => {
 

  const { userId, address } = request.body

  if (!userId || !address) {
    response.body = new ResponseBody(400, "userId and address are required", {})
    return next()
  }

  const result = await AddressesModel.addAddressToUser({ userId, address })
 


  const statusCode = typeof result.statusCode === 'number' ? result.statusCode : 500
  const message = result.message || "Something went wrong"
  const data = result.data || {}

  response.body = new ResponseBody(statusCode, message, data)
  next()
}

const updateAddress = async (request, response, next) => {
  const { userId, addressId, newAddress } = request.body

  if (!userId || !addressId || !newAddress) {
    response.body = new ResponseBody(400, "userId, addressId, and newAddress are required", {})
    return next()
  }

  const result = await AddressesModel.updateAddress({ userId, addressId, newAddress })
  response.body = new ResponseBody(result.statusCode, result.message, result.data || {})
  next()
}

const deleteAddress = async (request, response, next) => {
  const { userId, addressId } = request.body

  if (!userId || !addressId) {
    response.body = new ResponseBody(400, "userId and addressId are required", {})
    return next()
  }

  const result = await AddressesModel.deleteAddress({ userId, addressId })
  response.body = new ResponseBody(result.statusCode, result.message, result.data || {})
  next()
}

const getAllAddresses = async (request, response, next) => {
  const { userId } = request.body

  if (!userId) {
    response.body = new ResponseBody(400, "userId is required", {})
    return next()
  }

  const result = await AddressesModel.getAllAddresses({ userId })
  response.body = new ResponseBody(result.statusCode, result.message, result.data || {})
  next()
}


export const AddressesController = {
  addAddress,
  updateAddress,
  deleteAddress,
  getAllAddresses
}

