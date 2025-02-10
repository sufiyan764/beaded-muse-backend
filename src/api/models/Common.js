'use strict'

import { MONGO_MODEL } from '.'

const counter = async ({customer, counter}) => {
  const sequenceCount = await MONGO_MODEL.mongoFindOneAndUpdate('customers', { _id: customer }, {
    $inc: {
      [`counters.${counter}`]: 1
    }
  });
  
  return sequenceCount?.value?.counters[counter] || 1
}

const getAdminName = async (_id) => {
  const admin = await MONGO_MODEL.mongoFindOne("admins", { _id },{project: {firstName: 1, lastName: 1}})
  const { firstName = "", lastName = "" } = admin
  const adminName = lastName ? `${firstName} ${lastName}` : firstName
  return adminName
}


export const CommonModel = { counter, getAdminName }
