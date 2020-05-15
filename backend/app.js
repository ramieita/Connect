const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const keys = require("./config/keys");
const configDB = require("./config/keys");

const users = require("./routes/users");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
//app.use(express.urlencoded({ extended: true }));
app.use(cors());

const db = configDB.DB;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`Connection to ${db} successful.`);
  })
  .catch((err) => {
    console.log(`Connection to ${db} failed due to ${err}`);
  });


app.use('/api/v1/users', users);
app.use(function(req, res) {
  res.type('text/plain').status(404).send('404 Page Not Found.');
});


const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
