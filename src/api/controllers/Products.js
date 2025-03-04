'use strict'

import { ResponseBody } from '../../lib'
import { ProductsModel } from '../models'

const showAllProducts = async (request,response,next) => {
   const allProducts = await ProductsModel.retrieveAllProducts()
   const responseBody = new ResponseBody(200,'success',allProducts)
   response.body = responseBody
   next()
}

const showFeaturedProducts = async (request,response,next) => {
  const allFeaturedProducts = await ProductsModel.retrieveFeaturedProducts()
  const responseBody = new ResponseBody(200,'success',allFeaturedProducts)
  response.body = responseBody
  next()
}

export const ProductsController = {
  showAllProducts,
  showFeaturedProducts
}