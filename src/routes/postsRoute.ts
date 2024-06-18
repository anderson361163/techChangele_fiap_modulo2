import express from 'express'

const route = express.Router();

route
    .get('/posts')
    .post('/posts')

export default route;