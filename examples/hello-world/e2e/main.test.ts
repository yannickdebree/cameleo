import request from 'supertest'

describe('Hello world', () => {
    it('Should return "Hello world"', async () => {
        const body = await request().get().expect()
    })
})