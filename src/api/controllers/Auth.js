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
        const responseBody = new ResponseBody(400, 'Customer Already Exists', isCustomerExist)
        response.body = responseBody
       return next()
    }

    const result = await AuthModel.onBoardCustomer(body)

    if (result.status) {
        const responseBody = new ResponseBody(200,'Customer Created Successfully',result)
        response.body  = responseBody
       return next()
    }
    
}


//Login Customer

const customerLogin = async(request,response,next)=>{
    const {body} = request
    const result = await AuthModel.login(body)
    if (result.status) {
        const responseBody = new ResponseBody(200,"Logged In", result)
        response.body = responseBody
      return  next()
    }


    const responseBody = new ResponseBody(200,"Wrong Inputs", result)
        response.body = responseBody
      return  next()
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
