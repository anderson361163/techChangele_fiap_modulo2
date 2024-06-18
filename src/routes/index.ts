import express, { Application } from 'express'
import posts from './postsRoute.js'

const routes = (app: Application) => {
  app.use(
    express.json(),
    posts
  )
}

export default routes;