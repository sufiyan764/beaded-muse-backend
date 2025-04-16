"use strict";

import { ResponseBody } from "../../lib";
import { OrderModel } from "../models";

const processCheckout = async (req, res, next) => {
  const { body } = req;

  const result = await OrderModel.processCheckout(body);

  res.body = new ResponseBody(
    result.statusCode,
    result.message,
    result.data || {}
  );
  next();
};

const successOrder = async (req, res, next) => {
  const { body } = req;

  const result = await OrderModel.successOrder(body);

  res.body = new ResponseBody(
    result.statusCode,
    result.message,
    result.data || {}
  );
  next();
};

const getOrders = async (req, res, next) => {
  const { body } = req;

  const result = await OrderModel.getOrders(body);

  res.body = new ResponseBody(
    result.statusCode,
    result.message,
    result.data || {}
  );
  next();
};

const getOrderDetails = async (req, res, next) => {
  const { body } = req;

  const result = await OrderModel.getOrderDetails(body);

  res.body = new ResponseBody(
    result.statusCode,
    result.message,
    result.data || {}
  );
  next();
};

export const OrderController = {
    processCheckout,
    successOrder,
    getOrders,
    getOrderDetails
};
