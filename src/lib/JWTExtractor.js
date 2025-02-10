'use strict'
import crypto from 'crypto'

import { SERVER_CONFIG } from '../config'
import { Cryptography } from '../lib/Cryptography'

import { JWTMethods } from './JWTMethods'
import { ObjectId } from 'mongodb'

const { JWT_SECRET } = SERVER_CONFIG
const { decrypt } = Cryptography

export const jwtExtractor = async (request, response, next) => {
  const { headers } = request
  const { authorization } = headers
  const token = authorization && authorization.split('Bearer ')[1]
  const payload = await tokenVerification(token)
  if (payload.status) {
    payload.payload.customer = new ObjectId(payload.payload.customer)
    payload.payload._id = new ObjectId(payload.payload._id)
    request.body.tokenData = payload.payload
  } else {
    const { statusCode, message } = payload.payload
    return response.status(statusCode).json({
      status: statusCode,
      message
    })
  }

  next()
}

export const tokenVerification = async (token) => {
  try {
    const result = JWTMethods.verifyToken(token)
    const { iat, iv, encryptedData } = result
    const checkStatus = await JWTMethods.verifyAuth(iat)
    if (checkStatus) {
      const key = crypto.createHash('sha256').update(String(JWT_SECRET)).digest('base64').substring(0, 32)
      const payload = decrypt(key, iv, encryptedData)
      return {
        status: true,
        payload
      }
    } else {
      return { status: false, payload: { status: false, statusCode: 440, message: 'Your session has expired.' } }
    }
  } catch (error) {
    return { status: false, payload: { status: false, statusCode: 440, message: 'Your session has expired.' } }
  }
}
