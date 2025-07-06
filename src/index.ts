import app from './app'
import prisma from './prisma/client'
import 'dotenv/config'
const PORT = process.env.PORT || 3030

async function startServer() {
    try{
        await prisma.$connect()
        console.log('Connected to the database!')

        app.listen(PORT,()=>{
            console.log(`Server listening on http://localhost:${PORT}`)
        })
    }catch(error){
        console.error('Failed to connect to the database:', error)
        process.exit(1)
    }
    
}

startServer()
