

const PDFDocument = require('pdfkit')
const fs = require('fs')
import { Request, Response } from "express"

export default class BillController {

    public static getbill = (req: Request, res: Response) => {
        const doc = new PDFDocument({ size: "A7" })
        const filename = Date.now() + `bill.pdf`

        doc.pipe(fs.createWriteStream(`bill/` + filename, { encoding: 'UTF-8' }));
        
        const left = 60;
        doc
            .image('../../src/images/logo.png', 28, 20, { width: 30 })
            .fillColor("#444444")
            .fontSize(8)
            .font('./fonts/phetsarath_ot.ttf')
            .text("ຫວຍສົມໃນນຶກ", 50, 25, { align: "center" })
            .fontSize(6)
            .text("ບິນຖອກເງິນ", 50, 40, { align: "center" })
            .fontSize(5)
            .text("ງວດ: ", left, 60, { align: "left" })
            .fontSize(5)
            .text("ສາຂາ: ", left, 70, { align: "left" })
            .fontSize(5)
            .text("ວັນທີ: ", 0, 60, { align: "right" })
            .fontSize(5)
            .text("ນະຄອນຫລວງ", 0, 70, { align: "right" })
        doc.end();
        res.json({
            message: "Create Pdf sucessful."
        })
    }
}
