import express from 'express';
import multer from 'multer';
import * as XLSX from 'xlsx';

const routes = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
routes.post('/upload', upload.single('reportFile'), (req, res, next) => {

    const workbook = XLSX.read(req.file.buffer, {type: "buffer"});
    const sheet_name_list = workbook.SheetNames;
    const sheet_in_json = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]);


    return res.status(200).send({
        status: true,
    });
});


export default routes;