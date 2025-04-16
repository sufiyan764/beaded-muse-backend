'use strict'

import packageJSON from '../../../package.json'
import { ResponseBody } from '../../lib'
import { SERVER_CONFIG } from '../../config'

import { AuthRouter } from './Auth'
import { ProductsRouter } from './Products'
import { AccountDetailsRouter } from './AccountDetails'
import { FavouritesRouter } from './Favourites'
import { AddressesRouter } from './Addresses'
import { CartRouter } from './Cart'
import { CategoryRouter } from './Category'
import { OrderRouter } from './Order'

const { version } = packageJSON
const { SERVICE_NAME } = SERVER_CONFIG

const Routes = [
  { path: '/auth', router: AuthRouter },
  { path: '/products', router: ProductsRouter },
  { path: '/details', router: AccountDetailsRouter },
  { path: '/user', router: FavouritesRouter },
  { path: '/address', router: AddressesRouter },
  { path: '/cart', router: CartRouter },
  { path: '/category', router: CategoryRouter },
  { path: '/order', router: OrderRouter }
]

Routes.init = (app) => {
  if (!app || !app.use) {
    console.error('[Error] Route Initialization Failed: App / App.use is undefined')
    return process.exit(1)
  }

  Routes.forEach(route => app.use(route.path, route.router))

  // Unknown Routes
  app.use('*', (request, response, next) => {
    const error = {
      statusCode: 404,
      message: ['Cannot', request.method, request.originalUrl].join(' ')
    }
    next(error)
  })

  app.use((error, request, response, next) => {
    const fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl

    request = (({ headers, route, body, query, params, method }) => ({ headers, route, body, query, params, method }))(request)
    request.fullUrl = fullUrl

    if (!error) return

    request.service = SERVICE_NAME

    if (error.statusCode) {
      response.statusMessage = error.message
      return response.status(error.statusCode).json(error)
    }

    const err = {
      statusCode: 500,
      message: error.toString()
    }

    response.statusMessage = err.message
    return response.status(err.statusCode).json(err)
  })
}

export default Routes
