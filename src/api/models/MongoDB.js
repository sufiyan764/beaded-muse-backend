'use strict'

import { mongoClientDB } from '../../Server'
// Aggregate
const mongoAggregate = async (model, pipeline) => {
  const thisCollection = mongoClientDB.collection(model)
  return await thisCollection.aggregate(pipeline).toArray()
}

const mongoAggregateWithSkip = async (model, pipeline, skip) => {
  const thisCollection = mongoClientDB.collection(model)
  return await thisCollection.aggregate(pipeline).skip(skip).toArray()
}

// Find ONE
const mongoFindOne = async (model, query = {}, options) => {
  const thisCollection = mongoClientDB.collection(model)
  return await thisCollection.findOne(query, options)
}

// Find ONE and Update
const mongoFindOneAndUpdate = async (model, filter, updateDoc) => {
  if (updateDoc?.$set) updateDoc.$set.updatedAt = new Date().toISOString()
  else { updateDoc = { ...updateDoc, $set: { updatedAt: new Date().toISOString() } } }
  const thisCollection = mongoClientDB.collection(model)
  // this option instructs the method to create a document if no documents match the filter
  const options = { upsert: false, returnNewDocument: true }
  return await thisCollection.findOneAndUpdate(filter, updateDoc, options)
}

// Find and update with upsert false
const mongoFindOneAndUpdateWithoutUpsert = async (model, filter, updateDoc) => {
  if (updateDoc?.$set) updateDoc.$set.updatedAt = new Date().toISOString()
  else { updateDoc = { ...updateDoc, $set: { updatedAt: new Date().toISOString() } } }
  const thisCollection = mongoClientDB.collection(model)
  // this option instructs the method to create a document if no documents match the filter
  const options = { upsert: false }
  return await thisCollection.findOneAndUpdate(filter, updateDoc, options)
}

const mongoFindOneAndUpdateWithoutUpsertDynamic = async (model, filter, updateDoc) => {
  const thisCollection = mongoClientDB.collection(model)
  // this option instructs the method to create a document if no documents match the filter
  const options = { upsert: false }
  return await thisCollection.findOneAndUpdate(filter, updateDoc, options)
}

const mongoFindOneAndUpdateWithoutUpsertWithOptions = async (model, filter, updateDoc, options) => {
  const thisCollection = mongoClientDB.collection(model)
  // this option instructs the method to create a document if no documents match the filter
  options = { ...options, upsert: false }
  return await thisCollection.findOneAndUpdate(filter, updateDoc, options)
}

// Find ONE and Update No return
const mongoFindOneAndUpdateReturnNewDoc = async (model, filter, updateDoc) => {
  if (updateDoc?.$set) updateDoc.$set.updatedAt = new Date().toISOString()
  else { updateDoc = { ...updateDoc, $set: { updatedAt: new Date().toISOString() } } }
  const thisCollection = mongoClientDB.collection(model)
  // this option instructs the method to create a document if no documents match the filter
  const options = { returnDocument: 'after', upsert: false }
  return await thisCollection.findOneAndUpdate(filter, updateDoc, options)
}

const mongoFindOneAndUpdateReturnNewDocProjection = async (model, filter, allOptions) => {
  const { updateDoc, projection } = allOptions
  if (updateDoc?.$set) updateDoc.$set.updatedAt = new Date().toISOString()
  else { updateDoc = { ...updateDoc, $set: { updatedAt: new Date().toISOString() } } }
  const thisCollection = mongoClientDB.collection(model)
  // this option instructs the method to create a document if no documents match the filter
  const options = { returnDocument: 'after', upsert: false, projection }
  return await thisCollection.findOneAndUpdate(filter, updateDoc, options)
}

// Find Many
const mongoFind = async (model, query = {}, options) => {
  const thisCollection = mongoClientDB.collection(model)
  return await thisCollection.find(query, options).toArray()
}
// Insert ONE
const mongoInsertOne = async (model, doc) => {
  doc.createdAt = new Date().toISOString()
  doc.updatedAt = new Date().toISOString()
  const thisCollection = mongoClientDB.collection(model)
  return await thisCollection.insertOne(doc)
}
// Insert Many
const mongoInsertMany = async (model, docs) => {
  const thisCollection = mongoClientDB.collection(model)
  // this option prevents additional documents from being inserted if one fails
  const options = { ordered: true }
  return await thisCollection.insertMany(docs, options)
}
// Update ONE
const mongoUpdateOne = async (model, filter, updateDoc) => {
  const thisCollection = mongoClientDB.collection(model)
  // this option instructs the method to create a document if no documents match the filter
  const options = { upsert: true }
  return await thisCollection.updateOne(filter, updateDoc, options)
}
// Update Many
const mongoUpdateMany = async (model, filter, updateDoc) => {
  if (updateDoc?.$set) updateDoc.$set.updatedAt = new Date().toISOString()
  else { updateDoc = { ...updateDoc, $set: { updatedAt: new Date().toISOString() } } }
  const thisCollection = mongoClientDB.collection(model)
  return await thisCollection.updateMany(filter, updateDoc)
}

// Count Total Documents
const mongoCountDocuments = async (model, query = {}) => {
  const thisCollection = mongoClientDB.collection(model)
  return await thisCollection.countDocuments(query)
}

const mongoDeleteOne = async (model, query = {}) => {
  const thisCollection = mongoClientDB.collection(model)
  return await thisCollection.deleteOne(query)
}

const mongoFindWithSkipAndLimit = async (model, filter, options) => {
  const thisCollection = mongoClientDB.collection(model)
  return await thisCollection.find(filter, { projection: options.projection }).limit(options.limit).skip(options.skip).toArray()
}

const mongoFindWithSkipAndLimitWithSort = async (model, filter, options) => {
  const { limit, projection, skip, sortObj } = options
  const thisCollection = mongoClientDB.collection(model)
  return await thisCollection.find(filter, { projection }).sort(sortObj).skip(skip).limit(limit).toArray()
}

const mongoFindSortAndLimit = async (model, filter, options) => {
  const thisCollection = mongoClientDB.collection(model)
  return await thisCollection.find(filter, { projection: options.projection }).sort(options.sort).limit(options.limit).toArray()
}

const mongoFindAndSort = async (model, filter, sortBy) => {
  const thisCollection = mongoClientDB.collection(model)
  return await thisCollection.find(filter).sort(sortBy).toArray()
}

const mongoFindAndSortWithProjection = async (model, filter, projection, sortBy) => {
  const thisCollection = mongoClientDB.collection(model)
  return await thisCollection.find(filter, { projection }).sort(sortBy).toArray()
}

const mongoUpdateOneWithArrayFilter = async (model, filter, updateDocs, options) => {
  const thisCollection = mongoClientDB.collection(model)
  return await thisCollection.updateOne(filter, updateDocs, options)
}

export const MONGO_MODEL = {
  mongoAggregate,
  mongoAggregateWithSkip,
  mongoDeleteOne,
  mongoFindAndSort,
  mongoFindAndSortWithProjection,
  mongoFindOne,
  mongoFindOneAndUpdate,
  mongoFindOneAndUpdateWithoutUpsert,
  mongoFindOneAndUpdateWithoutUpsertDynamic,
  mongoFindOneAndUpdateWithoutUpsertWithOptions,
  mongoFindOneAndUpdateReturnNewDoc,
  mongoFindWithSkipAndLimit,
  mongoFindWithSkipAndLimitWithSort,
  mongoFindSortAndLimit,
  mongoFind,
  mongoInsertOne,
  mongoInsertMany,
  mongoUpdateOne,
  mongoUpdateMany,
  mongoCountDocuments,
  mongoFindOneAndUpdateReturnNewDocProjection,
  mongoUpdateOneWithArrayFilter
}
