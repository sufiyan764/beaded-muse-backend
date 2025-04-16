'use strict'

import { MONGO_MODEL } from '.'

const counter = async (counterName) => {
  const sequenceCount = await MONGO_MODEL.mongoFindOneAndUpdate('counters', {id: 1}, {
    $inc: {
      [counterName]: 1
    }
  });
  return sequenceCount?.value[counterName] || 1
}

const getAdminName = async (_id) => {
  const admin = await MONGO_MODEL.mongoFindOne("admins", { _id },{project: {firstName: 1, lastName: 1}})
  const { firstName = "", lastName = "" } = admin
  const adminName = lastName ? `${firstName} ${lastName}` : firstName
  return adminName
}


export const CommonModel = { counter, getAdminName }
