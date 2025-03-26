'use strict'

import { ResponseBody } from '../../lib'
import { CartModel } from '../models/Cart'

const addToCart = async (req, res, next) => {
  const { userId, productId, quantity, size, color } = req.body

  if (!userId || !productId || !quantity || !size || !color) {
    res.body = new ResponseBody(400, 'All fields are required')
    return next()
  }

  const result = await CartModel.addToCart({ userId, productId, quantity, size, color })
  res.body = new ResponseBody(result.statusCode, result.message, result.data || {})
  next()
}

const editCartItem = async (req, res, next) => {
  const { cartItemId, updates } = req.body

  if (!cartItemId || !updates) {
    res.body = new ResponseBody(400, 'cartItemId and updates are required')
    return next()
  }

  const result = await CartModel.updateCartItem({ cartItemId, updates })
  res.body = new ResponseBody(result.statusCode, result.message, result.data || {})
  next()
}

const deleteCartItem = async (req, res, next) => {
  const { cartItemId } = req.body

  if (!cartItemId) {
    res.body = new ResponseBody(400, 'cartItemId is required')
    return next()
  }

  const result = await CartModel.deleteCartItem({ cartItemId })
  res.body = new ResponseBody(result.statusCode, result.message, result.data || {})
  next()
}

const viewCart = async (req, res, next) => {
  const { userId } = req.body

  if (!userId) {
    res.body = new ResponseBody(400, 'userId is required')
    return next()
  }

  const result = await CartModel.getCartItemsByUser({ userId })
  res.body = new ResponseBody(result.statusCode, result.message, result.data || {})
  next()
}

export const CartController = {
  addToCart,
  editCartItem,
  deleteCartItem,
  viewCart
}
