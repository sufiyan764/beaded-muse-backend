'use strict'

import { MONGO_MODEL } from '.'

import { ObjectId } from 'mongodb'

const retrieveAllProducts = async (header)=>{
  let {categoryid : categoryId} = header 
  categoryId = parseInt(categoryId)
  
  const query = {...(categoryId && {categoryId})}
  console.log(header,query)
   const allProducts = await MONGO_MODEL.mongoFind('products', query)
   if (allProducts.length !== 0) {
      return {status: true, statusCode: 200, message: "Products retreived", data: {allProducts}}
   }else{
     return {status:false,statusCode:400,message: "No Products in Database"}
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

export const ProductsModel = {
    retrieveAllProducts,
    retrieveFeaturedProducts
}