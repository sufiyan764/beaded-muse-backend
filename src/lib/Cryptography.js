'use strict'

import crypto from 'crypto'
import randomstring from 'randomstring'
import { SERVER_CONFIG } from '../config'

const { CRYPTOGRAPHY_ALGO } = SERVER_CONFIG

const encrypt = (key, data) => {
  const iv = randomstring.generate(16)
  const encryptor = crypto.createCipheriv(CRYPTOGRAPHY_ALGO, key, iv)
  let cipherText = encryptor.update(JSON.stringify(data), 'utf8', 'hex')
  cipherText += encryptor.final('hex')
  return { encryptedData: cipherText, iv }
}

const decrypt = (key, iv, data) => {
  const decryptor = crypto.createDecipheriv(CRYPTOGRAPHY_ALGO, key, iv)
  const decryptedText = decryptor.update(data, 'hex', 'utf8')
  return JSON.parse(decryptedText + decryptor.final('utf8'))
}

export const Cryptography = { encrypt, decrypt }
