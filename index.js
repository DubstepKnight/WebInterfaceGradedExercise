const express = require("express");
const app = express();
const port = 5001;

app.use(express.json());

const usersRoute = require("./routes/v1/users");

app.use("/v1/users", usersRoute);

// usersRoute(app);

// console.log(usersRoute);

console.log("Yo motherfucka!!!");

app.listen(port, () => console.log(`The API is on and listening to the port: ${port}`));