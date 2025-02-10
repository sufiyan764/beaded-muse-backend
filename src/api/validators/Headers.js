'use strict'

import Joi from 'joi'

const JoiHeaders = Joi.object({
  authorization: Joi.string().required()
})

export { JoiHeaders }
