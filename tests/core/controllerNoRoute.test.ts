import { Curio, Controller, Route, HttpMethod } from '../../packages/core/src/index'
import * as express from 'express'
import * as request from 'supertest'
import { Server } from 'http'
import { Get, Put, Patch, Post, Delete } from '../../packages/core/src/route/route.decorator'

@Controller()
class TController {
}

let app = express()
let server: Server

afterAll(async () => {
    server.close()
})

beforeAll(async () => {
    server = app.listen(0, () => {
        Curio.start(app)
    })
})

describe('test verb decorators', () => {
    it('get', async () => {
        await request(server)
            .get('')
            .expect(404)
    })
})