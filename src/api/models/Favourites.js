  'use strict'

  import { MONGO_MODEL } from '.'

  import { ObjectId, ReturnDocument } from 'mongodb'

  const addToFavouritesDB = async({userId,productId})=>{
      const result = await  MONGO_MODEL.mongoUpdateOne('customers', {
        _id: new ObjectId(userId)
      },
      {
        $addToSet : {favourites: parseInt(productId)}
      },
    )

    
    if (result.modifiedCount > 0) {
        return {status: 200, message:"Product Successfully Added to favourites",data:{result}}
    }else{
      return {status:400,message:"Product is already in favourites list"}
    }
  }

  const retrieveAllFavouritesDB = async ({userId}) => {
   const pipeline = [
    {$match : {_id: new ObjectId(userId)}},
    {
      $lookup:{
        from: "products",
        localField: "favourites",
        foreignField: "id",
        as:"favouriteProducts"
      }
    }
   ]

   const result = await MONGO_MODEL.mongoAggregate('customers',pipeline)
   console.log(result)
   if (!result.length || !result[0].favouriteProducts.length) {
    return { status: 404, message: "No favourite products found", data: [] }

   
   }

   return { status: 200, message: "Favourite products retrieved", data: result[0].favouriteProducts };
  }

  const deleteFavouriteDB = async ({userId,productId})=>{
    const result = await MONGO_MODEL.mongoUpdateOne('customers',{
      _id: new ObjectId(userId)
    },
    {
      $pull: {favourites: parseInt(productId)}
    }
  )

  if (result.modifiedCount > 0) {
    return {status: 200, message:"Product Successfully deleted from favourites",data:{result}}
}else{
  return {status:400,message:"Product does not exists in favourites or already removed "}
}

  }

  export const FavouritesModel = {
    addToFavouritesDB,
    retrieveAllFavouritesDB,
    deleteFavouriteDB
  }