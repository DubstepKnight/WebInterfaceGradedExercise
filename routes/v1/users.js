const express = require("express");
const router = express.Router();
const users = require("../../data/users.json");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const jwtKey = require('../../jwtKey.json');
const jwtAuth = require("../../middlewares/auth");

// console.log(users);

router.post("/register", (req, res) => {
    // console.log(req);
    let newUser = req.body;
    const registerDate = new Date();
    // console.log(registerDate);
    // console.log(newUser);
    // console.log(newUser.password);
    bcrypt.hash(newUser.password, saltRounds, function(err, hash) {
        newUser = {
            id: users.length + 1,
            ...newUser,
            password: hash,
            createdAt: registerDate,
            lastLogin: '',
            postingsId: []
        }
        try {
            // console.log("/users/register works");
            users.push(newUser);
            res.status(200).send(users);
        }
        catch(err) {
            console.log(err);
            res.send(err);
        }
    })
    
})

router.post("/login", (req, res) => {
    let newUser = req.body;
    let loggingUser = users.filter(user => user.username === newUser.username);
    // console.log(loggingUser);

    // Checks if the username is correct
    if (!loggingUser[0]) {
        res.status(404).send("The user is not found, check your username");
    } else {
        let hashedPassword = loggingUser[0].password;
        // console.log(hashedPassword);

        // Compares the two hashes, the one from DB and the provided one
        bcrypt.compare(newUser.password, hashedPassword, function(err, result) {
            if (result) {
                // console.log(loggingUser[0].username);
                let payload = {
                    username: loggingUser[0].username,
                    email: loggingUser[0].email,
                    isAdmin: loggingUser[0].isAdmin,
                    postingsId: loggingUser[0].postingsId
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