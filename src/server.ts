import 'dotenv/config'
import fastify from "fastify"
import { prisma } from "./lib/prisma"

const app = fastify()


//LISTAR TODOS OS USUARIOS
app.get('/user', async (req, res) => {

    const dataUser = await prisma.user.findMany()
    
    res.status(200).send(dataUser)
})

//CRIAR USUARIO
app.post('/user', async (req, res) => {
    
    const dataUser = req.body
    
    const User = await prisma.user.create({
        data: dataUser
    
    })

    res.status(201).send('Usuario criado com sucesso!')
})

//ATUALIZAR USUARIO
app.put('/user/:id', async (req, res) => {
    
    const idUser = req.params
    const dataUser = req.body

    console.log(idUser)
    console.log(dataUser)

    const User = await prisma.user.update({
        where: { 
            id: idUser.id
        },
        
        data: dataUser
        
    })

    res.status(200).send('Usuario atualizado com sucesso!')
        
})

//DELETAR USUARIO
app.delete('/user/:id', async (req, res) => {
    
    const idUser = req.params
    
    const User = await prisma.user.delete({

     where:{
        
        id: idUser.id
        
    }
    
    })
    
    res.status(200).send('Usuario deletado com suscesso!')

})

const HOST = process.env.HOST
const PORT = process.env.PORT

app.listen({
    host:  typeof HOST === 'string' ? HOST : '0.0.0.0',
    port:  typeof PORT === 'string' ? Number(PORT) : 3333
}).then(() => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})