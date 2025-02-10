'use strict'

const joiValidate = (values, joiSchema,response, next) => {
  const { error = null } = joiSchema.validate(values)
  if (error !== null) {
    const { details } = error
    const { message } = details[0]
    return response.status(400).json({
      status: 400,
      message
    })
  }
  return next()
}

export { joiValidate }
