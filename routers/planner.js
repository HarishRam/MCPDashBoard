var express = require('express'),
    router = express.Router(),
    multer  = require('multer'),
    xlsxj = require("xlsx-to-json"),
    promise = require('promise'),
    fs = require('fs');

formatter = require("../public/javascript/formatter");

var upload = multer({ dest: './uploads/' });


router.get('/planner', function(req, res, next){
    res.render('calendar',{
        title: 'Sprint Planner - 2016'
    });
});

router.post('/planner', upload.single('upload'), function(req, res, next){

    console.log("File name", req.file.filename);
    console.log("Original file name", req.file.originalname);

    var filename = req.file.filename;
    var originalfilename = req.file.originalname;


    new promise(function(fulfill, reject){
        fs.rename("./uploads/"+filename, "./uploads/"+originalfilename, function(err) {
            if (err) {
                console.error(err);
                reject(err.stack);
            } else {
                console.log("Successful in renaming!!!");
                result = "./uploads/"+originalfilename ;
                fulfill(result);
            }
        });
    }).then(function(result){
            return new promise(function(fulfill, reject){
                xlsxj({
                    input: './uploads/'+originalfilename,  // input xls
                    output: "output.json", // output json
                    sheet: "Backlog"  // specific sheetname
                }, function(err, resp) {
                    if(err) {
                        console.error("Unable to create json file Error :",err);
                        reject(err.stack);
                    } else {
                        console.log("Successfully created json file");
                        result = resp;
                        fulfill(result);
                    }
                });
            });
        }).then(function(result){
            return new promise(function(fulfill, reject){
                var respFormattedData = formatter.filterJson(result);
                var plannerData = formatter.writePlannerData(JSON.stringify(respFormattedData));
                fs.writeFile("./public/json/planningData.json", JSON.stringify(plannerData), function(err) {
                    if(err) {
                        console.error("Unable to write data in filterGraph.json",err.stack);
                        reject(err.stack);
                    }
                    result = respFormattedData;
                    fulfill(result);
                });
            });
        }).then(function(result){
            return new promise(function(fullfill, reject){

                res.render('calendar',{
                    title:"Successfully Uploaded"
                });
                fullfill(result);
            });
        }).done();
});

router.post('/event/save', function(req, res, next){

  var fData = fs.readFileSync("./public/json/planningData.json");
    var updated_source = formatter.updateSource(JSON.parse(fData), req);

    fs.writeFile("./public/json/planningData.json", JSON.stringify(updated_source), function(err) {
        if(err) {
            console.error("Unable to write data in filterGraph.json",err.stack);
        }
    });

});

module.exports = router;