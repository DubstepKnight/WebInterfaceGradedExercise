const express = require("express");
const router = express.Router();
const postingsModel = require("../../models/postingsModel.js");
const auth = require("../../middlewares/auth");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const inputValidators = require("../../middlewares/inputValidators");
fs = require('fs');

// console.log(auth);

// TODO a lot of stuff, primarily to postings.post image upload

router.post("/", 
            auth.authenticate('jwt', { session: false} ),
            upload.array("images", 4),
            inputValidators.validatePosting,
            (req, res) =>{
    let newPosting = req.body;
    try {
        let images = [];
        req.files.forEach((element, i) => {
            fs.rename(req.files[i].path, './uploads/' + req.files[i].originalname, function (err) {
                if (err) throw err;
            });
            images.push(req.files[i].originalname)
        });
        let newerPosting = {
            ...newPosting,
            images
        }
        let renewedPostings = postingsModel.createNewPosting(newerPosting);
        res.status(201).send(renewedPostings);
    }
    catch (error) {
        console.log(error);
        res.send(error).status(401);
    }
})

router.get("/", (req, res) =>{
    console.log("Postings get works");
    let allPostings = postingsModel.getAllPostings();
    console.log(allPostings);
    try {
        res.send(allPostings).status(200);
    }
    catch(err) {
        console.log(err);
        res.send(err).status(500);
    }
})

router.put("/:id", 
            auth.authenticate('jwt', { session: false} ), 
            upload.array("images", 4),
            inputValidators.validatePosting, 
            (req, res) => {
    let editedPosting = req.body;
    console.log(editedPosting);
    // console.log('request files', req.files);
    try {
        let images = [];
        req.files.forEach((element, i) => {
            fs.rename(req.files[i].path, './uploads/' + req.files[i].originalname, function (err) {
                if (err) throw err;
            });
            images.push(req.files[i].originalname)
        });
        let fullyEditedPosting = {
            id: req.params.id,
            ...editedPosting,
            images
        }
        let newPostingsModel = postingsModel.changePosting(fullyEditedPosting);
        res.send(newPostingsModel).status(200);
    }
    catch(error) {
        console.log(error);
        res.send(error).status(404)
    }
})

router.delete("/:id", auth.authenticate('jwt', { session: false} ), (req, res) => {
    let deletingPosting = req.body;
    console.log(deletingPosting);
    try {
        postingsModel.deletePosting(deletingPosting);
        res.send("The posting was successfully deleted").status(200);
        console.log("The posting was successfully deleted!");
    }
    catch(error) {
        console.log(error);
        res.send(error).status(404)
    }
})

router.get("/search/location?", (req, res) => {
    // let chosenPosting =  postingsModel.getById(req.params.id);
    // console.log(req.query.location);
    let filterValue = req.query.location;
    try {
        let searchValue = postingsModel.searchByLocation(filterValue);
        console.log(searchValue);
        res.send(searchValue).status(200);
        // console.log("Succesfully sent the stuff");
    }
    catch(error) {
        console.log(error);
        res.send(error).status(404);
    }
})

router.get("/search/date?", (req, res) => {
    // let chosenPosting =  postingsModel.getById(req.params.id);
    // console.log(req.query.location);
    let filterValue = req.query.date;
    console.log(filterValue);
    try {
        let searchValue = postingsModel.searchByDateOfPosting(filterValue);
        console.log(searchValue);
        res.send(searchValue).status(200);
        // console.log("Succesfully sent the stuff");
    }
    catch(error) {
        console.log(error);
        res.send(error).status(404);
    }
})

router.get("/search/category?", (req, res) => {
    // let chosenPosting =  postingsModel.getById(req.params.id);
    // console.log(req.query.location);
    let filterValue = req.query.category;
    console.log(filterValue);
    try {
        let searchValue = postingsModel.searchByCategory(filterValue);
        console.log(searchValue);
        res.send(searchValue).status(200);
        // console.log("Succesfully sent the stuff");
    }
    catch(error) {
        console.log(error);
        res.send(error).status(404);
    }
})

router.get("/:id", (req, res) => {
    let chosenPosting =  postingsModel.getById(req.params.id);
    try {
        res.send(chosenPosting).status(200);
        console.log("Succesfully sent the stuff");
    }
    catch(error) {
        console.log(error);
        res.send(error).status(404);
    }
    console.log("get by id works!");
})

module.exports = router;