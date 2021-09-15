const express = require("express");
const logger = require("morgan");
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

app.use(logger("combined")); // Logs http requests
app.use(express.json()) // Logs incoming data in json format
app.use(express.urlencoded({ extended: false })); // Allows application to read form data

// Array of objects
let teamArray = [
    {id: 1, teamName: "lakers"},
    {id: 2, teamName: "sportsBallMcGee"},
    {id: 3, teamName: "teamSportYay!"}
]; 

// Function that sets the main page 
app.get('/', function(req, res) {
    res.render("index"); // Links index to be localhost:3000/ aka main page 
})

// Function for retrieving teamArray
app.get("/get-team-array", function(req, res) {
    res.json({ teamArray }); // Retrieves json teamArray
})

// Function for retrieving teamName from id
app.get("/get-team-id/:id", function(req, res) {

    let foundTeam;

    // For each function that uses team as an iterator
    // If team.id === user input id
    // Found team is set equal to value
    teamArray.forEach(team => {
        if (team.id === +req.params.id) {
            foundTeam = team;
        }
    })

    // Returns foundTeam and id
    res.json({ foundTeam, id: req.params.id })
}) 

// Function for retrieving item by id in teamArray with GET
app.get("/get-team-by-params-id/:id", function(req, res) {
    console.log(req.params);
    console.log(req.params.id);
    res.json({ params: req.params, id: req.params.id });
})

// Function for retrieving name item from teamArray with GET
app.get("/get-team-by-params-name/:name", function(req, res) {
    console.log(req.params);
    console.log(req.res.name);
    res.json({ params: req.params, name: req.params.name });
})

// Function for making POST requests
app.post("/", function(req, res) {
    // res.send("post path!");
    // res.json({ team: teamArray });
    console.log(req.body)
    teamArray.push(req.body);
    res.json({ team: teamArray})
    // res.json({ team: teamArray });
})

// Function that console logs that the server is running
app.listen(PORT, function() {
    console.log(`Server is now running @ port ${PORT}`);
});


