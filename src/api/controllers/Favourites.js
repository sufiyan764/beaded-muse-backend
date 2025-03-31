'use strict'

import { request, response } from 'express'
import { ResponseBody } from '../../lib'
import { FavouritesModel } from '../models/Favourites'


const addFavourites = async (request,response,next) =>{
  const {userId , productId } = request.body
  const favourites = await FavouritesModel.addToFavouritesDB({userId,productId})
  if (favourites.status !== 400) {
    response.body = new ResponseBody(200,"Added to Favourites",favourites)
  } else {
    response.body = new ResponseBody(400,"Product Already Exists in the list")
  }
  next()
  
}


const getFavourites = async(request,response,next) => {
    const {userId} = request.body
    const favouritesList = await FavouritesModel.retrieveAllFavouritesDB({userId})
    if (favouritesList.status !== 400) {
      response.body = new ResponseBody(200,"success",favouritesList)
    } else {
      response.body = new ResponseBody(400,"failure",favouritesList)
    }
    next()
}


const deleteFavourites =  async(request,response,next) =>{
  const {userId,productId} = request.body
  const result = await FavouritesModel.deleteFavouriteDB({userId,productId})
  if (result.status !== 400) {
    response.body = new ResponseBody(200,"success",result)
  } else {
    response.body = new ResponseBody(400,"failure",result)
  }
  next()
}

const toggleFavourite = async (request, response, next) => {
  const { userId, productId } = request.body

  if (!userId || !productId) {
    response.body = new ResponseBody(400, "userId and productId are required")
    return next()
  }

  // First check if product is already in favourites
  const user = await MONGO_MODEL.mongoFindOne(
    'customers',
    { _id: new ObjectId(userId) },
    { projection: { favourites: 1 } }
  )

  const favourites = user?.favourites || []

  let result

  if (favourites.includes(parseInt(productId))) {
    // Remove it
    result = await FavouritesModel.deleteFavouriteDB({ userId, productId })
    result.message = "Removed from favourites"
  } else {
    // Add it
    result = await FavouritesModel.addToFavouritesDB({ userId, productId })
    result.message = "Added to favourites"
  }

  response.body = new ResponseBody(result.status || 200, result.message, result.data || {})
  next()
}


export const FavouritesController = {
  addFavourites,
  getFavourites,
  deleteFavourites,
  toggleFavourite
}