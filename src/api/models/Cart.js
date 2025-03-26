'use strict'

import { MONGO_MODEL } from '.'
import { ObjectId } from 'mongodb'

const addToCart = async ({ userId, productId, quantity, size, color }) => {
  const filter = {
    userId: new ObjectId(userId),
    productId,
    size,
    color
  }

  // Check if item already exists (avoid duplicate)
  const existing = await MONGO_MODEL.mongoFindOne('carts', filter)
  if (existing) {
    return { statusCode: 400, message: 'Product already in cart with same size & color' }
  }

  const cartItem = {
    userId: new ObjectId(userId),
    productId,
    quantity,
    size,
    color,
    addedAt: new Date().toISOString()
  }

  const result = await MONGO_MODEL.mongoInsertOne('carts', cartItem)
  return {
    statusCode: 200,
    message: 'Product added to cart',
    data: { insertedId: result.insertedId }
  }
}

const updateCartItem = async ({ cartItemId, updates }) => {
  const result = await MONGO_MODEL.mongoUpdateOne(
    'carts',
    { _id: new ObjectId(cartItemId) },
    { $set: { ...updates, updatedAt: new Date().toISOString() } }
  )

  if (result.modifiedCount > 0) {
    return { statusCode: 200, message: 'Cart item updated successfully' }
  } else {
    return { statusCode: 404, message: 'Cart item not found or unchanged' }
  }
}

const deleteCartItem = async ({ cartItemId }) => {
  const result = await MONGO_MODEL.mongoDeleteOne('carts', {
    _id: new ObjectId(cartItemId)
  })

  if (result.deletedCount > 0) {
    return { statusCode: 200, message: 'Cart item deleted successfully' }
  } else {
    return { statusCode: 404, message: 'Cart item not found' }
  }
}

const getCartItemsByUser = async ({ userId }) => {
  const pipeline = [
    { $match: { userId: new ObjectId(userId) } },
    {
      $lookup: {
        from: 'products',
        localField: 'productId',
        foreignField: 'id',
        as: 'product'
      }
    },
    { $unwind: '$product' }
  ]

  const items = await MONGO_MODEL.mongoAggregate('carts', pipeline)

  return {
    statusCode: 200,
    message: 'Cart retrieved successfully',
    data: { cart: items }
  }
}

export const CartModel = {
  addToCart,
  updateCartItem,
  deleteCartItem,
  getCartItemsByUser
}
