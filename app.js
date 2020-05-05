const express = require('express');
const fs = require("fs");
const app = express();
const router = express.Router();
const path = require('path');
var bodyParser = require('body-parser');
var routeSignUp = require('./routes/Signup');
var routeLogin = require('./routes/Login');

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(__dirname + '\/public'));
app.use('/', router);
app.use(express.json());

let currentDepatment = {};
let searchResult = [];

//redirect to Home page 
app.get('/', (req, res) => {
    res.redirect("/views/home.html");
    console.log("tested")
});
app.get('/dashbord.html', (req, res) => {
    currentDepatment = {};
    searchResult = {};
});

// API for Signup & Login
app.use(routeSignUp);
app.use(routeLogin);


//get all the entreprises
app.get('/api/entreprises', (req, res) => {
    res.sendFile(path.join(__dirname + '\/entreprises.json'));
});

//add an entreprise
app.post('/api/entreprises', (req, res) => {
    fs.readFile("entreprises.json", (err, data) => {
        if (err) {
            return console.error(err);
        } else {
            const entreprices = JSON.parse(data);
            entreprices.push({
                "id": entreprices.length + 1,
                "name": req.body.name,
                "discription": req.body.discription,
                "location": req.body.location,
                "deprartments": []
            });
            fs.writeFile("entreprises.json", JSON.stringify(entreprices, null, 2), (err, result) => {
                if (err) {
                    return console.error(err);
                } else {
                    res.send("the entreprise is added successfully")
                }

            });
        }
    });
});

//get departements of an id entreprise
app.get('/api/entreprises/:id', (req, res) => {
    fs.readFile("entreprises.json", (err, data) => {
        if (err) {
            return console.error(err);
        } else {
            const entreprices = JSON.parse(data);
            const entreprice = entreprices.find(e => e.id === +req.params.id);
            if (!entreprice) return res.status(404).send("there is no such entreprise");
            else {
                res.send(entreprice);
            }
        }
    });
});

//add departements using an id entreprise
app.post('/api/entreprises/:id', (req, res) => {
    fs.readFile("entreprises.json", (err, data) => {
        if (err) {
            return console.error(err);
        } else {
            const entreprices = JSON.parse(data);
            const entreprice = entreprices.find(e => e.id === +req.params.id);
            if (!entreprice) return res.status(404).send("there is no such entreprise");
            else {
                entreprice.deprartments.push({
                    "id": entreprice.deprartments.length + 1,
                    "name": req.body.name,
                    "chef": req.body.chef,
                    "discription": req.body.discription,
                    "salaries": []
                });
                fs.writeFile("entreprises.json", JSON.stringify(entreprices, null, 2), (err, result) => {
                    if (err) {
                        return console.error(err);
                    } else {
                        res.send("the department is added successfully")
                    }

                });
            }
        }
    });
});

//search on salary by his name
app.get('/search', (req, res) => {
    let salaries = [];
    fs.readFile("entreprises.json", (err, data) => {
        if (err) {
            return console.error(err);
        } else {
            const entreprices = JSON.parse(data);
            for (let e = 0; e < entreprices.length; e++) {
                for (let d = 0; d < entreprices[e].deprartments.length; d++) {
                    for (let s = 0; s < entreprices[e].deprartments[d].salaries.length; s++) {
                        if (entreprices[e].deprartments[d].salaries[s].name.toLowerCase() === req.query.name.toLowerCase()) {
                            let salary = entreprices[e].deprartments[d].salaries[s];
                            salary.entrepriceName = entreprices[e].name;
                            salary.departementName = entreprices[e].deprartments[d].name;
                            salaries.push(salary);
                        }
                    }
                }
            }
            searchResult = salaries;
            res.redirect('/search.html');

        }
    });
});

app.get('/api/search', (req, res) => {
    res.send(searchResult);
});

//get the departement information
app.get('/department', (req, res) => {

    fs.readFile("entreprises.json", (err, data) => {
        if (err) {
            return console.error(err);
        } else {
            const entreprices = JSON.parse(data);
            for (let e = 0; e < entreprices.length; e++) {
                for (let d = 0; d < entreprices[e].deprartments.length; d++) {
                    if (entreprices[e].id === +req.query.entId &&
                        entreprices[e].deprartments[d].id === +req.query.depId) {

                        currentDepatment = entreprices[e].deprartments[d];
                        currentDepatment.entrepriceID = entreprices[e].id;
                        currentDepatment.entrepriceName = entreprices[e].name;

                        res.redirect('/department.html');
                        return;
                    }
                }
            }
        }
    });
});


app.get('/api/departement/', (req, res) => {
    res.send(currentDepatment);
});


//add a salary of an id departement in an id entreprise
app.post('/api/departement/:idE/:idD', (req, res) => {

    fs.readFile("entreprises.json", (err, data) => {
        if (err) {
            return console.error(err);
        } else {
            const entreprices = JSON.parse(data);
            const entreprice = entreprices.find(e => e.id === +req.params.idE)
            const departement = entreprice.deprartments.find(d => d.id === +req.params.idD);

            if (!(entreprice && departement)) return res.status(404).send("there is no such entreprise or department");
            else {
                departement.salaries.push({
                    "id": departement.salaries.length + 1,
                    "matricule": req.body.matricule,
                    "name": req.body.name,
                    "lastName": req.body.lastName,
                    "age": req.body.age,
                    "salaire": req.body.salaire
                });
                fs.writeFile("entreprises.json", JSON.stringify(entreprices, null, 2), (err, result) => {
                    if (err) {
                        return console.error(err);
                    } else {
                        res.send("the salary is added successfully")
                    }
                });
            }
        }
    });
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));