const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const port = 5001;

// app.use(auth);

app.use(bodyParser.json());
// app.use(cors);

const usersRoute = require("./routes/v1/users");
const postingsRoute = require("./routes/v1/postings");

// console.log(postingsRoute);
// console.log(usersRoute);

app.use("/v1/users", usersRoute);
app.use("/v1/postings", postingsRoute);

// usersRoute(app);

// console.log(usersRoute);

app.listen(port, () => console.log(`The API is on and listening to the port: ${port}`));