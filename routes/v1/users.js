const express = require("express");
const router = express.Router();
const usersModel = require("../../models/usersModel.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const jwtKey = require('../../jwtKey.json');
// const jwtAuth = require("../../middlewares/auth");

// console.log(users);

router.post("/register", (req, res) => {
    // console.log(req);
    let newUser = req.body;
    const registerDate = new Date();
    // console.log(registerDate);
    // console.log(newUser);
    bcrypt.hash(newUser.password, saltRounds, function(err, hash) {
        newUser = {
            id: usersModel.getAllUsers().length + 1,
            ...newUser,
            password: hash,
            createdAt: registerDate,
            lastLogin: '',
            postingsId: []
        }
        try {
            // console.log("/users/register works");
            let newUsersModel = usersModel.addNewUser(newUser);
            res.status(200).send(newUsersModel);
        }
        catch(err) {
            console.log(err);
            res.send(err);
        }
    })
    
})

// console.log("Asdasd");

router.post("/login", (req, res) => {
    let newUser = req.body;
    // let loggingUser = usersModel.filter(user => user.username === newUser.username);
    let loggingUser = usersModel.getByUsername(newUser.username);
    console.log( "loggingUser :", loggingUser);

    // Checks if the username is correct
    if (!loggingUser) {
        res.status(404).send("The user is not found, check your username");
    } else {
        let hashedPassword = loggingUser.password;
        // console.log(hashedPassword);

        // Compares the two hashes, the one from DB and the provided one
        bcrypt.compare(newUser.password, hashedPassword, function(err, result) {
            if (result) {
                let payload = {
                    username: loggingUser.username,
                    email: loggingUser.email,
                    isAdmin: loggingUser.isAdmin,
                    postingsId: loggingUser.postingsId
                }

                let options = {
                    expiresIn: "7d"
                }

                const token = jwt.sign(payload, jwtKey.key, options);
                
                // console.log(importantData);
                res.status(202).json({token});
            } else {
                res.status(401).send("The password is not correct");
            }
        })
    }
    
    
})

module.exports = router;