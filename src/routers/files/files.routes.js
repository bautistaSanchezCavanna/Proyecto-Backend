import Router from 'express';
import multer from 'multer';
const router = Router();
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.resolve(__dirname, '../../../public/Img'));
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    }
});

const uploader = multer({storage});

router.get('/', uploader.single('file'),(req, res)=>{
if(!req.file){
    return res.json({
        status: error,
        error: 'Error'
    });
}
res.json({
    data: req.file
})
});

export default router;