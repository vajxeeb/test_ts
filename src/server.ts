
const express = require('express')
import { sequlize } from "./database"
const app = express()
var cors = require('cors')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
import jwt_decode from "jwt-decode";

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 7000

app.listen(PORT, () => {
    console.log(`Server runing at--> http://localhost:${PORT}`)
    sequlize.authenticate().then(async () => {
        console.log("database connected")
        try {
           // await sequlize.sync({ force: false, alter: true})
        } catch (error: any) {
            console.log(error.message)
        }
    }).catch((e: any) => {
        console.log("Connect failed...!")
    })
})

//<===============Init Swagger Or API docs=======>
import { option } from './config/swaggeroption'
const specs = swaggerJSDoc(option)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

//<==============Init api route =================>
const apiRoute = require('./routes/api.route')
app.use('/api/', apiRoute);



var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNywidXNlcm5hbWUiOiJ6Iiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU1OTYyNTA1LCJleHAiOjE2NTYwNDg5MDV9.J_h5_polbEowA2SkDGEw8Sejsn29uoHkkVSsFYRDr20";
var decoded = jwt_decode(token);
console.log(decoded)


