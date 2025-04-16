"use strict";

import { ResponseBody } from "../../lib";
import { CheckoutModel } from "../models/";

const processCheckout = async (req, res, next) => {
  const { body } = req;

  const result = await CheckoutModel.processCheckout(body);

  res.body = new ResponseBody(
    result.statusCode,
    result.message,
    result.data || {}
  );
  next();
};

export const CheckoutController = {
    processCheckout,
};
