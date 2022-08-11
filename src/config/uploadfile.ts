// //const multer = require('multer')
// //const path = require('path')
// import multer from 'multer'
// import path from 'path'

// const storage = multer.diskStorage({
//     destination: (req: any, file: any, cb: any) => {
//         cb(null, 'src/images')
//     },
//     filename: (req: any, file: any, cb: any) => {
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1000000 },
//     fileFilter: (req: any, file: any, cb: any) => {
//         const fileTypes = /jpeg|jpg|png|gif/
//         const mimeType = fileTypes.test(file.mimetype)  
//         const extname = fileTypes.test(path.extname(file.originalname))

//         if(mimeType && extname) {
//             return cb(null, true)
//         }
//         cb('Give proper files formate to upload')
//     }
// });
// // .single('menu_image')
// export default upload;