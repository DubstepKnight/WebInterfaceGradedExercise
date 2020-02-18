const express = require("express");
const router = express.Router();
const postingsModel = require("../../models/postingsModel.js");
const auth = require("../../middlewares/auth");
fs = require('fs');

// console.log(auth);

router.post("/", auth.authenticate('jwt', { session: false} ), (req, res) =>{
    
})

module.exports = router;