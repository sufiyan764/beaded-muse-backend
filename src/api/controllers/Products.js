'use strict'

import { ResponseBody } from '../../lib'
import { ProductsModel } from '../models'

const showAllProducts = async (request, response, next) => {
  const { headers, query } = request

  const result = await ProductsModel.retrieveAllProducts(headers, query)

  response.body = new ResponseBody(result.statusCode, result.message, result.data || {})
  next()
}


const showFeaturedProducts = async (request,response,next) => {
  const allFeaturedProducts = await ProductsModel.retrieveFeaturedProducts()
  const responseBody = new ResponseBody(200,'success',allFeaturedProducts)
  response.body = responseBody
  next()
}

const showProductDetails = async (request, response, next) => {
  const { productId } = request.params

  if (!productId) {
    response.body = new ResponseBody(400, 'productId is required', {})
    return next()
  }

  const result = await ProductsModel.retrieveProductDetailsWithCategory(productId)

  response.body = new ResponseBody(result.statusCode, result.message, result.data)
  next()
}



export const ProductsController = {
  showAllProducts,
  showFeaturedProducts,
  showProductDetails
}