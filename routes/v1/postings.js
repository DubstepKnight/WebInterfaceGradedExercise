const express = require("express");
const router = express.Router();
const postingsModel = require("../../models/postingsModel.js");
const auth = require("../../middlewares/auth");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
fs = require('fs');

// console.log(auth);

// TODO a lot of stuff, primarily to postings.post image upload

router.post("/", 
            auth.authenticate('jwt', { session: false} ),
            upload.array("images", 4),
            (req, res) =>{
    let newPosting = req.body;
    // console.log(newPosting);
    if (newPosting) {
        try {
            let renewedPostings = postingsModel.createNewPosting(newPosting)
            res.status(201).json({renewedPostings});
        }
        catch (error) {
            // console.log(error);
            res.send(error).status(401);
        }
    } else {
        res.send("Your request is empty bro").status(400);
    }
})

router.get("/", (req, res) =>{
    console.log("Postings get works");
    let allPostings = postingsModel.getAllPostings();
    console.log(allPostings);
    try {
        res.send(allPostings).status(201);
    }
    catch(err) {
        console.log(err);
        res.send(err).status(400);
    }
})

router.get("/:id", (req, res) => {
    let chosenPosting =  postingsModel.getById(req.params.id);
    try {
        res.send(chosenPosting).status(201);
        console.log("Succesfully sent the stuff");
    }
    catch(error) {
        console.log(error);
        res.send(error).status(404);
    }
    console.log("get by id works!");
})

router.put("/:id", auth.authenticate('jwt', { session: false} ), (req, res) => {
    let editedPosting = req.body;
    console.log(editedPosting);
    try {
        let newPostingsModel = postingsModel.changePosting(editedPosting);
        res.send(newPostingsModel).status(201);
        console.log("The postings was changed!");
    }
    catch(error) {
        console.log(error);
        res.send(error).status(404)
    }
})

module.exports = router;