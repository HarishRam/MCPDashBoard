var fs = require ('fs');

//****************************** filter the columns and fetch the relevant data, for now we are not getting the End date
function filterJson(source_json){
    try{
        var fdata = [],
            filter = ["Manufacturers", "Device List", "Current Test Date", "Estimated End Date"];
//            jData = source_json;
//            console.log("Collection Data", jData);

        source_json.forEach(function(content){
            var formatedData = {};
            for(var d in content){
                if(filter.indexOf(d) != -1){
                    if (content[d] !== ""){
                        formatedData[d]=content[d];
                    }
                }
            }
            if(Object.keys(formatedData).length>0)
                fdata.push(formatedData);
        });

//        console.log("Formatted content",fdata);
        return fdata;


    }catch (ex){
        console.log('Error while filtering the source json', ex.stack);
        return "null";
    }
}

//******************************** getting predefined colors of device manufacturers and adding to the planner
function writePlannerData(source){
    var colorCol = JSON.parse(fs.readFileSync('public/json/colors.json'));

    var arrData = [];
    var ids = 0;

    JSON.parse(source).forEach(function(nodes){
        var formattedJson = {};
        formattedJson["id"] = ids;
        formattedJson["title"] = nodes["Device List"];
        formattedJson["start"] = nodes["Current Test Date"];
        formattedJson["end"] = nodes["Estimated End Date"];
        formattedJson["color"] = colorCol[nodes["Manufacturers"]];
        arrData.push(formattedJson);
        ids+=1;
    });

//    console.log("Planner Data", arrData);

    return arrData;
}

function updateSource(source, req){
        var event_details={};

    if(req.body.action === "update"){
        source.forEach(function(device){
            if(device.id == req.body.id){
                device.title = req.body.title;
                device.start = req.body.start;
                device.end = req.body.end;
            }
        });
    }


    if(req.body.action==="new"){
       event_details.id = source.length;
       event_details.title = req.body.title;
       event_details.start = req.body.start;
       event_details.end = req.body.end;

       source.push(event_details);
    }

    if(req.body.action==="delete"){
        for(var i=0;i<source.length;i++){
            if(source[i].id == req.body.id)
                source.splice(i, 1);
        }
    }

    var data = source.filter(function(value){return value !==null});

    console.log("Updated data ", data);

    return data;
}

module.exports = {'filterJson': filterJson,
'writePlannerData':writePlannerData,
'updateSource':updateSource};