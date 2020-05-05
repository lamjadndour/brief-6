var express = require('express');
const fs = require('fs');

//Recuperation d'un fichier Json

let rawdata = fs.readFileSync('users.json');
var Login = JSON.parse(rawdata);

module.exports = (function () {
    var api = express.Router();
    api.route("/Login").post(function (req, res) {
        var filtred = Login.filter((e) => { if (e.username === req.body.username && e.password === req.body.password) { return e; } })
        if (filtred.length != 1) {
            res.send({
                request: false
            });
            res.end();
        } else {
            res.send({
                request: true
            });
        }
        res.end()
    });
    return api;
})();