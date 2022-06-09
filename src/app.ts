import Dog from './models/dog.model';

const express = require('express')
import { Request, Response } from "express";
import { sequlize } from "./database"
import Role from "./models/role.model";

const app = express()
app.use(express.json());

app.listen(8000, () => {
    console.log(`App runing at http://localhost:8080`)

    sequlize.authenticate().then(async () => {
        console.log("database connected")
        // try {
        //     await sequlize.sync({ force: false, alter: true })
        // } catch (error: any) {
        //     console.log(error.message)
        // }

    }).catch((e: any) => {
        console.log("Connect failed...!")
        console.log(e.message)
    })
})

//import { Sequelize } from "sequelize-typescript";

import User from "./models/user.model";
app.get("/users", async (req: Request, res: Response): Promise<Response> => {
    const allUser: User[] = await User.findAll();
    return res.status(200).json(allUser);
});
app.post("/adduser", async (req: Request, res: Response): Promise<Response> => {

    const user: User = await User.create({ ...req.body });
    return res.status(200).json(user);
});
app.post('/addrole', async (req: Request, res: Response): Promise<void> => {

    try {
        const role: Role = await Role.create({ ...req.body })
        res.status(201).json({message: "Created", data: role})
    } catch (error: any) {
        res.status(500).json(error.message)
        console.log(error.message)
    }

})
app.get("/dogs", async (req: Request, res: Response): Promise<Response> => {
    const allDogs: Dog[] = await Dog.findAll();
    return res.status(200).json({ message: "OK", data: allDogs });
});
app.post("/dogs", async (req: Request, res: Response): Promise<void> => {
    try {
        const dog: Dog = await Dog.create({ ...req.body });
        res.status(201).json(dog);
    } catch (error: any) {
        res.status(500).json({ msg: error.message })
    }

});

app.delete("/dogs/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        const deleteDog: Dog | null = await Dog.findByPk(id)
        await Dog.destroy({ where: { id } });

        if (null) {
            res.status(404).json({ message: "Not found id " + id })
            return;
        }
        res.status(200).json({
            message: "Ok",
            data: deleteDog
        })

    } catch (error: any) {
        res.status(500).json({ msg: error.message })
    }

});
app.put("/dogs/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params

        await Dog.update({ ...req.body }, { where: { id } });
        const updateDog: Dog | null = await Dog.findByPk(id)
        if (updateDog == null) {
            res.status(404).json({ message: "Not found id " + id })
            return;
        }
        res.status(200).json({
            message: "OK",
            data: updateDog
        })

    } catch (error: any) {
        res.status(500).json({ msg: error.message })
    }

});


const userRouter = require('./routes/user.route')
const mainRouter = "/api/"

app.use(mainRouter, userRouter);


