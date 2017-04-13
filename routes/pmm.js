var express = require('express');
var router = express.Router();

var Papa = require('babyparse');
var fs = require('fs');
var file = './rasxod-topliva-avtomobilej.csv';


var content = fs.readFileSync(file, {encoding: 'UTF-8'});

/* GET pmm listing. */
router.get('/', function (req, res, next) {
    res.render('pmm', {});
});

router.get('/fs', function (req, res, next) {
    Papa.parse(content, {
        delimiter: ";",
        complete: function (results) {
            res.json(results.data);
            //console.log(results);
        }
    });
});

module.exports = router;
