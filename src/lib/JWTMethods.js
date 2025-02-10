'use strict'

import JWT from "jsonwebtoken"

import { SERVER_CONFIG } from '../config'

const { JWT_SECRET, JWT_START_EPOCH } = SERVER_CONFIG

const verifyToken = token => JWT.verify(token, JWT_SECRET)

const verifyAuth = async issuedDate => {
    if (issuedDate * 1000 > JWT_START_EPOCH) return true
    else return false
}

export const JWTMethods = { 
    verifyToken, 
    verifyAuth
}
