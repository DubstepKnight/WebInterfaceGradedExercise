const express = require("express");
const router = express.Router();
const postingsModel = require("../../models/postingsModel.js");
const auth = require("../../middlewares/auth");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const cloudinaryStorage = require("multer-storage-cloudinary");
const inputValidators = require("../../middlewares/inputValidators");
const {dataUri, multerUpload} = require('../../middlewares/utilities/multerProcess');

fs = require('fs');
// const dUri = new Datauri();

router.post("/", 
            auth.authenticate('jwt', { session: false} ),
            multerUpload,
            inputValidators.validatePosting,
            async (req, res) =>{
                let newPosting = req.body;
                console.log("req.body: ", req.body);
                console.log("req.files: ", req.files);
                let images = [];
    try {

        const files = dataUri(req).content;
        return files
     /**   req.files.forEach(async (element, i) => {

            const uploadRe
            console.log("element", element)
            console.log("element: ", element.url);
            images.push(element.url)
        });
        console.log("images: ",  images);
        let newerPosting = {
            ...newPosting,
            sellerId: req.user.id,
            images
        }
        let renewedPostings = postingsModel.createNewPosting(newerPosting);
        res.status(201).send(renewedPostings);**/
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

router.get("/seller/",
           auth.authenticate('jwt', { session: false} ),
          (req, res) =>{
    console.log("Get all posting of a user works");
    // console.log("req: ", req.user.id);
    let idOfTheSeller = req.user.id;
    // console.log("idOfTheSeller: ", idOfTheSeller);
    let somePostings = postingsModel.getBySellerId(idOfTheSeller);
    console.log(somePostings);
    try {
        res.send(somePostings).status(200);
    }
    catch(err) {
        console.log(err);
        res.send(err).status(500);
    }
})

/**router.put("/:id", 
            auth.authenticate('jwt', { session: false} ), 
            parser.array("images", 4),
            inputValidators.validatePosting, 
            (req, res) => {
    let editedPosting = req.body;
    console.log(editedPosting);
    // console.log('request files', req.files);
    try {
        let images = [];
        req.files.forEach((element, i) => {
            // fs.rename(req.files[i].path, './uploads/' + req.files[i].originalname, function (err) {
            //     if (err) throw err;
            // });
            images.push(element.url)
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
})*/

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