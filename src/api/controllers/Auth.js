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


//Creating the customer for the first time when they signup
const createCustomer = async(request,response,next) =>{
    const {body} = request
    const isCustomerExist = await AuthModel.customerExists(body)

    if (isCustomerExist.status) {
        
       return response.status(400).json({
            message: "Customer already exists"
        })
    }

    const result = await AuthModel.onBoardCustomer(body)

    if (result.status) {
        response.status(200).json({
            message: "Customer Created Successfully"
        })
    }
    
}


//Login Customer

const customerLogin = async(request,response,next)=>{
    const {body} = request
    const result = await AuthModel.login(body)
    if (result.status) {
        return response.status(200).json({
            message: "Logged In"
        })
    }

    response.status(400).json({
        message: "Wrong inputs"
    })
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
    checkAdmin,
    createCustomer,
    customerLogin
}
