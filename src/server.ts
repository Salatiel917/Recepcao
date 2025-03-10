import 'dotenv/config'

import bcrypt from "bcrypt"
import z from "zod"
import fastify from "fastify"
import { prisma } from "./lib/prisma"
import userRoutes from './routes/userRoutes'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'

const app = fastify()

app.register(fastifyCors)

app.register(fastifyJwt, {
    secret:"halfguard"
})

app.register(userRoutes)

const HOST = process.env.HOST
const PORT = process.env.PORT

app.listen({
    host:  typeof HOST === 'string' ? HOST : '0.0.0.0',
    port:  typeof PORT === 'string' ? Number(PORT) : 3333
}).then(() => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})