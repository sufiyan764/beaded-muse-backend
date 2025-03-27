'use strict'

import { ResponseBody } from '../../lib'
import { ProductsModel } from '../models'

const showAllProducts = async (request, response, next) => {
  const { headers, query } = request
  const userId = headers.userid || ''

  const result = await ProductsModel.retrieveAllProducts(headers, query, userId)

  response.body = new ResponseBody(result.statusCode, result.message, result.data || {})
  next()
}



const showFeaturedProducts = async (request, response, next) => {
  const userId = request.headers.userid || ''

  const result = await ProductsModel.retrieveFeaturedProducts(userId)

  response.body = new ResponseBody(result.statusCode, result.message, result.data)
  next()
}


const showProductDetails = async (request, response, next) => {
  const { productId } = request.params
  const userId = request.headers.userid || ''

  if (!productId) {
    response.body = new ResponseBody(400, 'productId is required', {})
    return next()
  }

  const result = await ProductsModel.retrieveProductDetailsWithCategory(productId, userId)

  response.body = new ResponseBody(result.statusCode, result.message, result.data)
  next()
}




export const ProductsController = {
  showAllProducts,
  showFeaturedProducts,
  showProductDetails
}