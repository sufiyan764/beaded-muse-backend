'use strict'

import { ResponseBody } from '../../lib'
import { AuthModel } from '../models'

const onBoardCustomer = async (request, response, next) => {
    const { body } = request
    const result = await AuthModel.onBoardCustomer(body)
    const responseBody = new ResponseBody(200, 'Success', result)
    response.body = responseBody

    next()
}

const checkCustomer = async (request, response, next) => {
    const { body } = request
    const result = await AuthModel.checkCustomer(body)
    const responseBody = new ResponseBody(200, 'Success', result)
    response.body = responseBody

    next()
}

const createAdmin = async (request, response, next) => {
    const { body } = request
    const result = await AuthModel.createAdmin(body)
    const responseBody = new ResponseBody(200, 'Success', result)
    response.body = responseBody

    next()
}

const checkAdmin = async (request, response, next) => {
    const { body } = request
    const result = await AuthModel.checkAdmin(body)
    const responseBody = new ResponseBody(200, 'Success', result)
    response.body = responseBody

    next()
}

const login = async (request, response, next) => {
    const { body } = request
    const result = await AuthModel.login(body)
    const responseBody = new ResponseBody(200, 'Success', result)
    response.body = responseBody

    next()
}

export const AuthController = {
    onBoardCustomer,
    createAdmin,
    login,
    checkCustomer,
    checkAdmin
}
