'use strict'

import { MONGO_MODEL } from '.'

import { ObjectId } from 'mongodb'

const retrieveAllProducts = async (header, query) => {
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

  return {
    status: true,
    statusCode: 200,
    message: 'Products retrieved',
    data: {
      products: allProducts,
      totalCount,
      offset: _start,
      limit: _limit
    }
  }
}



const retrieveFeaturedProducts = async ()=>{
  const featuredProducts = await MONGO_MODEL.mongoFind('products',{isFeatured : true})
  if (featuredProducts.length !== 0) {
    return {status: true, statusCode: 200, message: "Featured Products retreived", data: {featuredProducts}}
 }else{
   return {status:false,statusCode:400,message: "No Featured Products in Database"}
 }
}


const retrieveProductDetailsWithCategory = async (productId) => {
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

  return {
    status: true,
    statusCode: 200,
    message: 'Product details retrieved',
    data: { product: result[0] }
  }
}

export const ProductsModel = {
    retrieveAllProducts,
    retrieveFeaturedProducts,
    retrieveProductDetailsWithCategory
}