const express = require("express");
const router = express.Router();
const users = require("../../data/users.json");

// console.log(users);

router.post("/register", (req, res) => {
    // console.log(req);
    let newUser = req.body;
    const registerDate = new Date();
    // console.log(registerDate);
    // console.log(newUser);
    newUser = {
        id: users.length + 1,
        ...newUser,
        createdAt: registerDate,
        lastLogin: '',
        postingsId: []
    }
    try {
        console.log("/users/register works");
        users.push(newUser);
        res.status(200).send(users);
    }
    catch(err) {
        console.log(err);
        res.send(err);
    }
})

module.exports = router;