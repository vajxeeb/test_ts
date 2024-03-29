
import * as express from 'express'
import { SyncDB } from "./database"
const cors = require('cors')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
import { Request, Response, NextFunction } from 'express'
import { option } from './config/swaggeroption'

const app = express()

//<=========Midleware===========>
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 7000

//<==========Request============>
app.use((req: Request, res: Response, next: NextFunction) => {
    next();
})
//<==========Init Swagger========>
const specs = swaggerJSDoc(option)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

//<==========Init api route======>
const apiRoute = require('./routes/api.route')
app.use('/api/', apiRoute);

//<=========Static Image Folder==>
app.use('/images', express.static('./images'))

//<=========Start Server=========>
app.listen(PORT, () => {
    console.log(`Server runing on port--> ${PORT}`)
    SyncDB();
})

app.get('/', (req, res) => {
    res.json({
        message: "Hello Guys"
    })
})
















//Example Row Query
// const { QueryTypes } = require('sequelize');
// import { Request, Response } from 'express';
// import { Query } from './query/queries'
// import { NextFunction } from 'express';

// app.get('/get', async (req: Request, res: Response) => {
//     const { page, size } = req.query
//     let getProduct = ""; getProduct = Query.getProduct
//     if (page && size && parseInt(page) > 0 && parseInt(size) > 0) getProduct += " LIMIT ?, ?"

//     const data = await sequelize.query(getProduct,
//         {
//             replacements: [parseInt(page), parseInt(size)],
//             type: QueryTypes.SELECT
//         });
//     res.json({ data: data })

// })


// const dateObj = new Date();
// const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
// const date = ('0' + dateObj.getDate()).slice(-2);
// const day = dateObj.getDay()
// const year = dateObj.getFullYear();
// const houre = dateObj.getHours();
// const second = dateObj.getSeconds();
// const minis = dateObj.getMinutes();
// const minisecond = dateObj.getMilliseconds();
// const billNumber = year + '' + month + '' + date+''+day+''+houre+''+second+''+minis+''+minisecond;
// console.log(billNumber)



