
const express = require('express')
import { sequlize } from "./database"
const app = express()
var cors = require('cors')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

app.use(cors({origin: '*'}))
app.use(express.json())

const PORT = process.env.PORT || 7000
const globalAny: any = global
globalAny.__basedir = __dirname;

app.listen(PORT, () => {
    console.log(`Server runing at--> http://localhost:${PORT}`)
    sequlize.authenticate().then(async () => {
        console.log("database connected")
        try {
           await sequlize.sync({ force: false, alter: true})
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



