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

const onBoardCustomer = async body => {
    let { admin } = body
    const newCustomer = await checkCustomer(body)
    if (!newCustomer.status) return newCustomer
    const { data: customerData } = newCustomer
    const { name, slug } = customerData;
    const customerInsert = { name, slug, counters: COUNTERS }
    const customerCreated = await MONGO_MODEL.mongoInsertOne("customers", customerInsert)
    admin.customer = customerCreated?.insertedId
    const result = await createAdmin(admin)
    const { status = false, data = {} } = result
    if (status) {
        data.admin.companyName = name
        const token = AuthHelper.encryptToken(data.admin)
        return { status: true, statusCode: 200, message: "Welcome", data: { token, companyName: name } }
    }
    return result
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

const login = async body => {
    const { mobile } = body
    if (!mobile) return { status: false, statusCode: 400, message: "Invalid mobile number" }
    const query = AuthConstants.adminQuery(mobile)
    let admin = await MONGO_MODEL.mongoAggregate("admins", query)
    if (!admin || !admin[0]) return { status: false, statusCode: 400, message: "Invalid mobile number" }
    admin = admin[0]
    const token = AuthHelper.encryptToken(admin)
    return { status: true, statusCode: 200, message: "Welcome", data: { token, companyName: admin.companyName } }
}

export const AuthModel = {
    onBoardCustomer,
    createAdmin,
    login,
    checkCustomer,
    checkAdmin
}
