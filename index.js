const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5001;
const {uploader, config} = require('./middlewares/utilities/cloudinary');

// app.use(auth);

app.use(bodyParser.json());
app.use(config);
// app.use(cors);

const usersRoute = require("./routes/v1/users");
const postingsRoute = require("./routes/v1/postings");


app.use("/v1/users", usersRoute);
app.use("/v1/postings", postingsRoute);


app.listen(PORT, () => console.log(`The API is on and listening to the port: ${PORT}`));