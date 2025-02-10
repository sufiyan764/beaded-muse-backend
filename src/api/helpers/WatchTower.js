'use strict'

const WatchTower = fn => (request, response, next) => {
    return Promise.resolve(fn(request, response, next)).catch(next)
}

export { WatchTower }
