const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({ 
    cloud_name: 'hbgq5qscq', 
    api_key: '267426767432492', 
    api_secret: 'YPrTD2xGGi60qaQ1ZqOGi3waGVA' 
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "sell-out",
    allowedFormats: ["jpg", "png"],
    });
const parser = multer({ storage: storage });

module.exports = parser;