'use strict'

import { JoiHeaders } from '../validators'
import { joiValidate } from '../../lib'

const checkCommonHeaders = (request, response, next) => {
  const { headers } = request
  const { authorization } = headers
  return joiValidate({ authorization }, JoiHeaders, response, next)
}

export const Headers = { checkCommonHeaders }
