
// const express = require('express')
import * as express from 'express'
import { sequelize } from "./database"
// const  cors = require('cors')
const cors = require('cors')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 7000
const globalAny: any = global
globalAny.__basedir = __dirname;

app.listen(PORT, () => {
    console.log(`Server runing at--> http://localhost:${PORT}`)
    sequelize.authenticate().then(async () => {
        console.log("database connected")
        try {
            // await sequelize.sync({ force: false, alter: true})
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

const { QueryTypes } = require('sequelize');
import { Request, Response } from 'express';

app.get('/rowquery', async (req: Request, res: Response) => {
    const data = await sequelize.query("SELECT * FROM tbl_user, tbl_role WHERE tbl_user.role_id = tbl_role.id",
        {
            type: QueryTypes.SELECT
        });
    res.json({ data })

})

