const multer = require('multer');
const Datauri = require('datauri');
const path = require('path');

const storage = multer.memoryStorage();

const multerUpload = multer({storage}).array('images');

const dUri = new Datauri();

const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

module.exports.dataUri = dataUri;
module.export.multerUpload = multerUpload;