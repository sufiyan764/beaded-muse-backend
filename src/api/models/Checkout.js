"use strict";

import { CommonModel, MONGO_MODEL } from ".";
import { ObjectId } from "mongodb";

const processCheckout = async (body) => {
  const {
    customerId,
    products,
    totalAmount,
    baseAmount,
    gstAmount,
    shippingAmount
  } = body;

  const id = await CommonModel.counter("orders");

  const order = {
    id,
    customerId,
    products,
    totalAmount,
    baseAmount,
    gstAmount,
    shippingAmount,
    status: "pending",
    orderDate: new Date().toISOString(),
    paymentStatus: "pending",
    updatedAt: new Date().toISOString(),
  };

  const result = await MONGO_MODEL.mongoInsertOne("orders", order);
  return {
    statusCode: 200,
    message: "Product added to cart",
    data: { insertedId: result.insertedId },
  };
};

export const CheckoutModel = {
  processCheckout,
};
