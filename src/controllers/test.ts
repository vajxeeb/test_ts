import { Request, Response } from 'express';
import { Route, Get } from 'tsoa'


@Route('test')
export default class TestCotroller {
    @Get('/')
    public static test = (req: Request, res: Response) => {
        return res.json({
            message: "Hello Guys"
        })
    }
}