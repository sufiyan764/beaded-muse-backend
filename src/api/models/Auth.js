'use strict'

import { MONGO_MODEL } from '.'

import { AuthHelper } from '../helpers'
import { ObjectId } from 'mongodb'
import { AuthConstants, PURE_CONSTANTS } from '../constants'

const { CUSTOMER } = PURE_CONSTANTS
const { COUNTERS } = CUSTOMER

const checkCustomer = async body => {
    const { customer, admin } = body
    const { name } = customer;
    let slug = name.replace(/\s+/g, ' ').trim().toLowerCase()
    slug = slug.split(" ").join("-")
    const customerExists = await MONGO_MODEL.mongoFindOne("customers", { slug }, { project: { name: 1 } })
    const adminExists = await checkAdmin(admin)
    if (customerExists) return { status: false, statusCode: 400, message: "Account with this name already exists" }
    if(adminExists.status) return { status: false, statusCode: 400, message: "Mobile number already exists" }
    return { status: true, statusCode: 200, message: "Please enter the OTP", data: { name, slug } }
}

//checking if customer already exists in the database

const customerExists = async (body)=>{
    const {email} = body
    const result = await MONGO_MODEL.mongoFindOne("customers", {email} )
    if (result) {
        return {status:true,statusCode:200,message: "User Already Exists in the database"}
    }

    return {status:false,statusCode:400,message: "User Does Not Exists in Database"}

}

//

const onBoardCustomer = async body => {
    let  customer = body
    const userExists = await customerExists(customer)
    if (userExists.status) {
        return {status:false , statusCode:400 ,message : "User Already Exists in the database"}
    }

    customer._id = new ObjectId();
    customer.password = await AuthHelper.hashPassword(customer.password)
    customer.phonenumber = parseInt(customer.phonenumber)

    await MONGO_MODEL.mongoInsertOne("customers",customer)

    const token = AuthHelper.encryptToken(customer)

    return {
        status:true,
        statusCode: 200,
        message : "Customer created successfully!",
        data: {customer, token}
    }


    
}

const login = async body => {
    const {email,password} = body
    const result =await  MONGO_MODEL.mongoFindOne("customers",{email})
    if (result) {
        const isValid = await AuthHelper.comparePassword(password,result.password)
        if (isValid) {
            const token = AuthHelper.encryptToken(result)
            return {status:true,statusCode:200,message:"Customer exists" ,data: {customer:result, token} }
        }else{
            return {status:false,statusCode:400,message:"Customer Does not exists"}
        }
    }
}

const checkAdmin = async body => {
    const { mobile } = body
    const adminExists = await MONGO_MODEL.mongoFindOne("admins", { mobile }, { project: { mobile: 1 } })
    if (adminExists) return { status: true, statusCode: 200, message: "Please enter the OTP" }
    return { status: false, statusCode: 400, message: "Invalid mobile number" }
}

const createAdmin = async body => {
    let admin = body
    const adminExists = await checkAdmin(admin)
    if (adminExists.status) return { status: false, statusCode: 400, message: "Mobile number already exists" }
    admin.customer = new ObjectId(admin.customer)
    admin.mobile = parseInt(admin.mobile)
    await MONGO_MODEL.mongoInsertOne("admins", admin)
    admin.createdAt = new Date().toISOString()
    admin.updatedAt = new Date().toISOString()
    return { status: true, statusCode: 200, message: "Admin created successfully!", data: { admin } }
}



export const AuthModel = {
    onBoardCustomer,
    createAdmin,
    login,
    checkCustomer,
    checkAdmin,
    customerExists,

}
