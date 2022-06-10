
const express = require('express')
import { sequlize } from "./database"
const app = express()
app.use(express.json());

app.listen(7000, () => {
    console.log(`App runing at http://localhost:8080`)

    sequlize.authenticate().then(async () => {
        console.log("database connected")
        // try {
        //     await sequlize.sync({ force: true, alter: true})
        // } catch (error: any) {
        //     console.log(error.message)
        // }

    }).catch((e: any) => {
        console.log("Connect failed...!")
        console.log(e.message)
    })
})


const mainRoute = '/api/'
//<============Call Routes=================>
const userRoute = require('./routes/user.route')
const roleRoute = require('./routes/role.route')
const typeRoute = require('./routes/type.route')
const unitRoute = require('./routes/unit.route')

//<============ Paths =======================>
app.use(mainRoute, userRoute)
app.use(mainRoute, roleRoute)
app.use(mainRoute, typeRoute)
app.use(mainRoute, unitRoute)

