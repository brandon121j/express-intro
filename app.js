const { application } = require("express");
const express = require("express");

const path = require("path");

const app = express();

// console.log(path.join());

// console.log(__dirname);

// console.log(path.join(__dirname, "views"));

// __dirname = Directory Name

app.set("views", path.join(__dirname, "views")); // Gives access to views folder
app.set("view engine", "ejs"); 

app.use(express.static(path.join(__dirname, "public"))); // Allows us to access files from public folder

const PORT = process.env.PORT || 3000; // Runs server on port 3000

app.get('/', function(req, res) {
    res.render("index"); // Links index to be localhose:3000/ aka main page 
})

app.listen(PORT, function() {
    console.log(`Server is now running @ port ${PORT}`);
});

