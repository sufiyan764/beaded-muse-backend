"use strict";

const orderDetailsQuery = (query) => {
  return [
    {
      $match: query,
    },
    {
      $addFields: {
        customerIdObj: {
          $toObjectId: "$customerId",
        },
      },
    },
    {
      $lookup: {
        from: "customers",
        localField: "customerIdObj",
        foreignField: "_id",
        pipeline: [
          {
            $project: {
              _id: 0,
              firstname: 1,
              lastname: 1,
              email: 1,
              phonenumber: 1,
              addresses: 1,
            },
          },
        ],
        as: "customer",
      },
    },
    {
      $addFields: {
        customer: {
          $first: "$customer",
        },
      },
    },
  ];
};

export const OrderConstants = {
  orderDetailsQuery,
};
