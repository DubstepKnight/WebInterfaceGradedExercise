const express = require("express");
const router = express.Router();
const passport = require("passport");
const postings = require("../../data/postings.json");

router.post("/", passport.authenticate("jwt", {session: false}), (req, res) =>{
    console.log("Postings post");
})