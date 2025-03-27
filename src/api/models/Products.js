'use strict'

import { MONGO_MODEL } from '.'

import { ObjectId } from 'mongodb'

const retrieveAllProducts = async (header, query, userId) => {
  let { categoryid: categoryId } = header
  let { _start = 0, _limit = 10 } = query

  categoryId = parseInt(categoryId)
  _start = parseInt(_start)
  _limit = parseInt(_limit)

  const filter = { ...(categoryId && { categoryId }) }

  const allProducts = await MONGO_MODEL.mongoFindWithSkipAndLimit(
    'products',
    filter,
    {
      projection: {},
      skip: _start,
      limit: _limit
    }
  )

  const totalCount = await MONGO_MODEL.mongoCountDocuments('products', filter)

  if (!allProducts.length) {
    return {
      status: false,
      statusCode: 400,
      message: 'No products found',
      data: {}
    }
  }

  let userFavourites = []

  if (userId) {
    const user = await MONGO_MODEL.mongoFindOne(
      'customers',
      { _id: new ObjectId(userId) },
      { projection: { favourites: 1 } }
    )
    userFavourites = user?.favourites || []
  }

  const productsWithFavouriteFlag = allProducts.map(product => ({
    ...product,
    isFavourite: userFavourites.includes(product.id)
  }))

  return {
    status: true,
    statusCode: 200,
    message: 'Products retrieved',
    data: {
      products: productsWithFavouriteFlag,
      totalCount,
      offset: _start,
      limit: _limit
    }
  }
}





const retrieveFeaturedProducts = async (userId) => {
  const featuredProducts = await MONGO_MODEL.mongoFind('products', { isFeatured: true })

  if (!featuredProducts.length) {
    return { status: false, statusCode: 400, message: "No Featured Products in Database" }
  }

  let favourites = []

  if (userId) {
    const user = await MONGO_MODEL.mongoFindOne(
      'customers',
      { _id: new ObjectId(userId) },
      { projection: { favourites: 1 } }
    )
    favourites = user?.favourites || []
  }

  const updatedProducts = featuredProducts.map(product => ({
    ...product,
    isFavourite: favourites.includes(product.id)
  }))

  return {
    status: true,
    statusCode: 200,
    message: "Featured Products retrieved",
    data: { featuredProducts: updatedProducts }
  }
}



const retrieveProductDetailsWithCategory = async (productId, userId) => {
  const pipeline = [
    { $match: { id: parseInt(productId) } },
    {
      $lookup: {
        from: 'categories',
        localField: 'categoryId',
        foreignField: 'id',
        as: 'categoryInfo'
      }
    },
    { $unwind: '$categoryInfo' }
  ]

  const result = await MONGO_MODEL.mongoAggregate('products', pipeline)

  if (!result.length) {
    return {
      status: false,
      statusCode: 404,
      message: 'Product not found',
      data: {}
    }
  }

  let product = result[0]

  if (userId) {
    const user = await MONGO_MODEL.mongoFindOne(
      'customers',
      { _id: new ObjectId(userId) },
      { projection: { favourites: 1 } }
    )

    const favourites = user?.favourites || []
    product.isFavourite = favourites.includes(product.id)
  }

  return {
    status: true,
    statusCode: 200,
    message: 'Product details retrieved',
    data: { product }
  }
}


export const ProductsModel = {
    retrieveAllProducts,
    retrieveFeaturedProducts,
    retrieveProductDetailsWithCategory
}