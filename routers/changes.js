var express = require('express'),
    router = express.Router(),
    promise = require('promise'),
    fs = require('fs'),
    formatter = require("../public/javascript/formatter");

//   Configure the colors for the manufacturers
router.get('/setting', function(req, res, next){

    new promise(function(fulfill, reject){
        fs.readFile('./public/json/colors.json',function(err, data){
                if(err){
                    console.error("Error in reading file", err.stack);
                    reject(err.stack);
                }
                console.log("Read file successfully ");
                fulfill(data);
            });
    }).then(function(result){
            var manuf = JSON.parse(result);
            res.render('content',{
                title: 'Configure Color for Manufacture',
                manufacture: manuf
            });
    }).done();
});

//Updating the planner data with the new colors choosen from the user
router.post('/setting', function(req, res, next){
    new promise(function(fulfill, reject){
        fs.writeFile("./public/json/colors.json", JSON.stringify(req.body), function(err) {
            if(err) {
                console.error("Unable to write data in filterGraph.json",err.stack);
                reject(err.stack);
            }
            console.log("Successfully saved the changes");
            fulfill(req.body);
        });
    }).then(function(result){
         return new promise(function(fulfill, reject){
             var respFormattedData = formatter.filterJson(JSON.parse(fs.readFileSync('./output.json')));
                var plannerData = formatter.writePlannerData(JSON.stringify(respFormattedData));
                fs.writeFile("./public/json/planningData.json", "var data="+JSON.stringify(plannerData)+";", function(err) {
                    if(err) {
                        console.error("Unable to write data in filterGraph.json",err.stack);
                        reject(err.stack);
                    }
                    result = respFormattedData;
                    fulfill(result);
                });
         });
    }).then(function(result){
         res.redirect('/planner');
    }).done();
});

module.exports = router;