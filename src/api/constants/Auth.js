'use strict'

const adminQuery = (mobile) => {
  return [
    {
      $match: {
        mobile,
      },
    },
    {
      $lookup: {
        from: "customers",
        localField: "customer",
        foreignField: "_id",
        as: "customer",
      },
    },
    {
      $addFields: {
        customer: {
          $first: "$customer._id"
        },
        companyName: {
          $first: "$customer.name",
        },
      },
    }
  ]
}

export const AuthConstants = {
  adminQuery,
}
