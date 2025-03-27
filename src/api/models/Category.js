'use strict'

import { MONGO_MODEL } from '.'

import { ObjectId } from 'mongodb'

const retrieveAllCategories = async () => {
   const allCategories = await MONGO_MODEL.mongoFind('categories', {})
   if (allCategories.length !== 0) {
      return {status: true, statusCode: 200, message: "Categories retreived", data: {allCategories}}
   }else{
     return {status:false,statusCode:400,message: "No Categories in Database"}
   }
}

export const CategoryModel = {
    retrieveAllCategories,
}