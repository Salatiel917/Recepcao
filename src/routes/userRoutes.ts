import { FastifyInstance } from "fastify"
import { z } from "zod" 
import { prisma } from "../lib/prisma"

export default function userRoutes(app:FastifyInstance){
    
//LISTAR TODOS OS USUARIOS
app.get('/user', async (req, res) => {

    const dataUser = await prisma.user.findMany()
    
    res.status(200).send(dataUser)
})

//CRIAR USUARIO
app.post('/user', async (req, res) => {

    const schema = z.object({
        name: z.string().trim(),
        chegada: z.string().trim(),
        consultor: z.string().trim(),
        status:     z.string().trim(),
        observação:  z.string().trim(),
        tel:      z.string().trim(),
        email:   z.string().trim().email()

    })
    
    const { name, chegada, consultor, status, observação, tel, email } = schema.parse(req.body)
    
    const User = await prisma.user.create({
        data: {
            name,
            chegada,  
            consultor,
            status,
            observação,
            tel,
            email
        }
    })
        res.status(201).send({ message: 'Usuario criado com sucesso!' })
})

//ATUALIZAR USUARIO
app.put('/user/:id', async (req, res) => {

    const schema = z.object({
        name: z.string().trim(),
        chegada: z.string().trim(),
        consultor: z.string().trim(),
        status:     z.string().trim(),
        observação:  z.string().trim(),
        tel:      z.string().trim(),
        email:   z.string().trim().email()

    })
    
    const { id } = req.params
    const { name, chegada, consultor, status, observação, tel, email } = schema.parse(req.body)

    const User = await prisma.user.update({
        where: { 
            id
        },
        data: { 
            name,
            chegada,  
            consultor,
            status,
            observação,
            tel,
            email
        }     
    })

    res.status(200).send({ message: 'Usuario atualizado com sucesso!' })

})

//DELETAR USUARIO
app.delete('/user/:id', async (req, res) => {
    
    const { id } = req.params
    
    const User = await prisma.user.delete({

     where:{
        
        id: id   
    }
    
    })
    
    res.status(200).send({ message: 'Usuario deletado com sucesso !' })

})
}