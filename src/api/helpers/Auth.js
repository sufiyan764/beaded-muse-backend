'use strict'

import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
import crypto from 'crypto'

import { SERVER_CONFIG } from '../../config'
import { Cryptography } from '../../lib'

const { JWT_SECRET, SALT_ROUNDS, JWT_EXPIRY } = SERVER_CONFIG
const { encrypt } = Cryptography

const hashPassword = async (password) => {
    const hash = await new Promise((resolve, reject) => {
        bcrypt.hash(password, SALT_ROUNDS, async (err, hash) => {
            if(hash) resolve(hash)
            reject("error")
        })
    })
    return hash
}

const comparePassword = async (password, hash) => {
    const isValid = await new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, valid) => {
            if(err) resolve(false)
            if(!valid) resolve(false)
            resolve(true)
        })
    })
    return isValid
}

const JWTSign = (admin, expiresIn) => {
    const token = JWT.sign(admin, JWT_SECRET, { expiresIn })
    return token
}

const encryptToken = (admin) => {
    const key = AuthHelper.generateKeyForPayloadEncryptionDecryption(JWT_SECRET)
    const adminBody = (({ password, ...rest }) => rest)(admin)
    const { encryptedData, iv } = encrypt(key, adminBody)
    const token = AuthHelper.JWTSign({ encryptedData, iv }, JWT_EXPIRY)
    return token
}



const generateKeyForPayloadEncryptionDecryption = (secret) => {
  return crypto.createHash('sha256').update(String(secret)).digest('base64').substring(0, 32)
}

export const AuthHelper = { 
    comparePassword, 
    JWTSign, 
    hashPassword, 
    generateKeyForPayloadEncryptionDecryption, 
    encryptToken
}
