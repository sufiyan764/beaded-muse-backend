'use strict'

import { ResponseBody } from '../../lib'
import { CategoryModel } from '../models'

const showAllCategories = async (request,response,next) => {
   const result = await CategoryModel.retrieveAllCategories()
   const responseBody = new ResponseBody(200, 'success', result)
   response.body = responseBody
   next()
}

export const CategoryController = {
    showAllCategories,
}