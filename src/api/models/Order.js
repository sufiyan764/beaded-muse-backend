"use strict";

import { custom } from "joi";
import { CommonModel, MONGO_MODEL } from ".";
import { ObjectId } from "mongodb";
import { OrderConstants } from "../constants";

const processCheckout = async (body) => {
  const {
    customerId,
    products,
    totalAmount,
    baseAmount,
    gstAmount,
    shippingAmount,
  } = body;

  const id = await CommonModel.counter("orders");

  const order = {
    id,
    customerId: customerId,
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
    message: "Order processed successfully",
    data: { id },
  };
};

const successOrder = async (body) => {
  const { id } = body;

  const result = await MONGO_MODEL.mongoFindOneAndUpdate(
    "orders",
    { id },
    { status: "success" }
  );
  return {
    statusCode: 200,
    message: "Order added succesfully",
    data: { id: "testing" },
  };
};

const getOrders = async (body) => {
  const { customerId } = body;

  const result = await MONGO_MODEL.mongoFind("orders", {
    customerId: customerId,
  });
  return {
    statusCode: 200,
    message: "All orders retreived",
    data: result,
  };
};

const getOrderDetails = async (body) => {
  const { customerId } = body;

  let { orderId } = body;
  orderId = parseInt(orderId);

  const query = {
    customerId: customerId,
    id: orderId,
  }

  const aggregateQuery = OrderConstants.orderDetailsQuery(query)

  let result = await MONGO_MODEL.mongoAggregate("orders", aggregateQuery);
  result = result?.[0] || {}
  return {
    statusCode: 200,
    message: "Order details retrieved",
    data: result,
  };
};

export const OrderModel = {
  processCheckout,
  successOrder,
  getOrders,
  getOrderDetails
};
