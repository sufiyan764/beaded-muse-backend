// 'use strict'

// import Express from 'express'
// import { Headers, WatchTower } from '../helpers'
// import { TestController } from '../controllers'
// import { jwtExtractor, SendResponse } from '../../lib'
// const { checkCommonHeaders } = Headers
// const { sendResponse } = SendResponse

// const TestRouter = new Express.Router()

// TestRouter.use(checkCommonHeaders)
// TestRouter.use(jwtExtractor)

// TestRouter.post('/', WatchTower(TestController.getAll))
// TestRouter.post('/add', WatchTower(TestController.add))
// TestRouter.put('/update', WatchTower(TestController.update))
// TestRouter.delete('/delete', WatchTower(TestController.deleteItem))
// TestRouter.post('/list', WatchTower(TestController.getTestList))

// TestRouter.use(sendResponse)

// export { TestRouter }
