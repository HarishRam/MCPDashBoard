var fs = require('fs');
var datafetcher = require('./datafetcher.js');

var sourcedata = fs.readFileSync('source.json');

JSON.parse(sourcedata).forEach(function(nodes){
//   var filteredData = {};
   var tableCol = [];

    for(var tickets in nodes){
        if(nodes.hasOwnProperty(tickets)){
            tableCol.push(tickets);
            tableCol.push(nodes[tickets].DeviceTitle);
            tableCol.push(getDemiName(nodes[tickets].Description));
            tableCol.push(getModelsFromDescription(nodes[tickets].Description));
            tableCol.push(getAssetIDFromDescription([tickets])).Description));
           // tableCol.push(getRAMSUrlFromDescription(nodes[tickets].Description));
            tableCol.push(getTestRailURLFromDescription([tickets].Description));
            getSubtasks(nodes[tickets].Subtask).forEach(function(data){
               tableCol.push(data);
            });
            tableCol.push(consolidatedReport(nodes[tickets].Subtask, nodes[tickets].ConsolidatedURL));
            tableCol.push(getJiraLabel(nodes[tickets].Labels));
            tableCol.push(liveDeployedDate(nodes[tickets].Subtask));
            tableCol.push(nodes[tickets].Description);
            tableCol.push(requestToGetSubtaskDesc(nodes[tickets].Subtask, nodes[tickets].ConsolidatedURL));
            /*requestToGetSubtaskDesc(nodes[tickets].Subtask).forEach(function (data) 
                {
                    SubtaskIDs.push(data);
                });*/
        }
    }
    console.log("Result",tableCol);
});

function getDemiName(description){
    var reg = new RegExp(/.*Brand:\s(\w+)\r\nModel:\s(\w+)/);
    var brand_mode = reg.exec(description);
    return brand_mode != null ? brand_mode[1]+"-"+brand_mode[2] : "NA"
}

function getModelsFromDescription(description){
    if(description !== null){
        var models = description.replace(/\r\n/g,"").match(/{noformat}(.*){noformat}/);
        return models !== null? models[1] : "NA";
    }else{
        return "NA";
    }
}

ffunction getAssetIDFromDescription(description)
{
 console.log("description :-"+description);   
 var reg1 = new RegExp("Asset ID.*");
 var getAsset = reg1.exec(description);
 console.log("Asset******"+getAsset);
 var asset = new RegExp(/-?\d+$/);
 var assetNO = asset.exec(getAsset);
 console.log("AssetNumber "+assetNO);
 if(assetNO!=null)
 {
    return assetNO;
 }
 else
 {
    return "NA";
 }
}

function getRAMSUrlFromDescription(description)
{
    
    var reg1 = new RegExp("https://bbc-.*");
    var getramurl = reg1.exec(description);
    if(getramurl!=null)
    {   
   return "<a href =\""+getramurl+"\" target="+"_blank >Ramseries5000 URL</a>";
}
else
{
return "NA";
}
}


function getTestRailURLFromDescription(description)
{
   
    var testrail = new RegExp("https://bbcpod.*");
    var getTestRailurl = testrail.exec(description);
    if(getTestRailurl!=null)
    {   

   return "<a href =\""+getTestRailurl+"\" target="+"_blank >TestRail URL</a>";
}
else
{
return "NA";
}
}


function getSubtasks(tasks){
    var project_list=["CATAL","iPlayer","News","Sport","RB+"];
    var content = [];
    tasks.forEach(function(data){
        if (data.search(/CLONE - Test/)===0 || data.search(/Test \w+/)===0){
            for(var i=0;i<project_list.length;i++){
                if(data.match(project_list[i])){
                    content[i]=((data.match(/-(.*)/) != null)? data.match(/-(.*)/)[1] : evaluateSubtask(data));
                }
            }
        }
    });
    return fill_empty_space(project_list, content);
}

function evaluateSubtask(task){
    return ((task.match(/Cycle.*/)!==null)) ? task : "NA" ;
}

function fill_empty_space(project_list, subtask){
    for(var i=0;i<project_list.length;i++){
        if(subtask[i] === undefined) subtask[i] = "NA";
    }
    return subtask;
}

function consolidatedReport(subtasks, consolidateID){
//    var report="NA";
//    subtasks.forEach(function(subtask){
    for(var i=0;i<subtasks.length;i++){
        if(subtasks[i].search(/Consolidated Report/) != 0){
            var index = subtasks.indexOf("Consolidated Report ");
            return (consolidateID[index]===undefined)? "NA" : consolidateID[index];
        }
    }
    return "NA";
}

function getJiraLabel(labels) 
{
   
    if (labels.indexOf("Android") != -1) 
    {
        return labels[labels.indexOf("Android")];
    } else if (labels.indexOf("iOS") != -1) {
        return labels[labels.indexOf("iOS")]
    } else {
        return "NA";
    }
}

function liveDeployedDate(subtasks){
    for(var i=0;i<subtasks.length;i++){
        if(subtasks[i].search(/Push device configurations live -/)===0){
            var liveDepDate = subtasks[i].match(/Push device configurations live - (\d+\s\w+\s\d+)/);
            return (liveDepDate!=null)?liveDepDate[1]:"NA";
        }
    }
    return "NA";
}

function requestToGetSubtaskDesc(subtasks, agentTicketId){

    var jira_api = "https://jira.dev.bbc.co.uk/rest/api/2/issue/";
    var ticket_id= userAgent(subtasks, agentTicketId);

    var jiraRespProm = datafetcher.jira(jira_api + ticket_id);

     return Promise.resolve(jiraRespProm).then(function(value)
     {
         return getModelsFromDescription(description.fields.description);
         console.log("SubTask Description....."+description.fields.description)
     });


}


function userAgent(subtasks, agentTicketId){
    for(var i=0;i<subtasks.length;i++){
        if(subtasks[i].search(/Add user agent.*/i) == 0){
            var index = i;
            return (agentTicketId[index]===undefined)? "NA" : agentTicketId[index];
        }
    }
    return "NA";
}