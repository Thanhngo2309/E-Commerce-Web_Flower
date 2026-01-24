import express from "express"
import 'dotenv/config'
import connectDB from "./database/db.js"
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);
import userRoute from './routes/userRoute.js'

const app = express()
const PORT = process.env.PORT || 3000

//middleware
app.use(express.json())



//http://localhost:8000/api/v1/user/register

app.use('/api/v1/user', userRoute)

app.listen(PORT,()=>{
    connectDB()
    console.log(`Sever is listening at port: ${PORT}`)
})