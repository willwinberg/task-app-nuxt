const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const config = require('../nuxt.config.js')

const { router } = require('./router')

// const taskRouter = require('./routers/taskRouter.js')
// const userRouter = require('./routers/userRouter.js')
// const birds = require('./routers/birds')
// const authRouter = require('./routers/authRouter')

// Import and Set Nuxt.js options
config.dev = process.env.NODE_ENV !== 'production'

// app.use('/api/users', userRouter)
// app.use('/api/tasks', taskRouter)
app.use('/api', router)
// app.use('/api/auth', authRouter)

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
