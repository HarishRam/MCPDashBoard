var request = require('request-promise'),
    fs = require('fs');

//**************************** jira api request and json in response
function jiradata(req_url) 
{

var cert = fs.readFileSync("");// add your .pem file URL
    return request({
        url: req_url,
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        strictSSL : true,
        cert : cert,
        key : cert,
        passphrase : '',// add your .epm file password
        securityOptions : 'SSL_OP_NO_SSLv3'
    }).then(function (body){
            if(body)
                try{
                    return JSON.parse(body);
                } catch (ex) {
                    console.error('error:', ex);
                }
        }).catch(function (reason) {
            console.error("%s; %s", reason.error.message, reason.options.url);
            console.log("%j", reason.response.statusCode);
        });


}

function fetch_demi(user_agent) {
    return request({
        url: "http://open.test.bbc.co.uk/wurfldemi/useragent.json",
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': user_agent
        }
    }).then(function (body) {
            if (body)
                try {
                    return JSON.parse(body);
                } catch (ex) {
                    console.error('error:', ex);
                }
        }).catch(function (reason) {
            console.error("%s; %s", reason.error.message, reason.options.url);
        //    console.log("%j", reason.response.statusCode);
        });
}

//  ************************** Fetching the relevant data from the source json
function getFormattedData(source_data) {

    var outerarray = source_data.issues.map(function (issue) {

    return jiradata(issue.self).then(function (issue_url) {
        var issue_lists = {},
            issue_details = {};

        issue_details["DeviceTitle"] = issue_url.fields.summary;
        issue_details["Labels"] = issue_url.fields.labels;
        issue_details["Description"] = issue_url.fields.description;
        issue_details["Subtask"] = issue_url.fields.subtasks.map(subtask => subtask.fields.summary);
        issue_details["SubtaskIDs"] = issue_url.fields.subtasks.map(subtask => subtask.fields.description);
        issue_details["ConsolidatedURL"] = issue_url.fields.subtasks.map(selfs => selfs.key);

        issue_lists[issue_url.key] = issue_details;

        return issue_lists;
        }).then(function (data) {
            return data;
        }).catch(function (err) {
            console.error("Error " + err.stack);
        });
    });
    return outerarray;
}

// *********************** Setting the fetched data and adding them in an array, which then use to display in the table
function getTableData(results){
    var json_data = eval(results) || [
        {"IPLTVCERT-5048": {"DeviceTitle": "Samsung - JazzL - 2016 - TV - Tizen", "Labels": ["2016", "Samsung"], "Description": "Device submitted for iPlayer, News, Sport and CRB certification\r\n\r\nBrand: hisense\r\nModel: tv_2015\r\n\r\nModels to be certified: \r\nLTDN50K321UWTSEU\r\n UB50EC591UWTSEU (online?\r\n HE50KEC315UWTS (Promo?\r\n LTDN55K321UWTSEU\r\n UB55EC591UWTSEU (online?\r\n LTDN40K321UWTSEU\r\n UB40EC591UWTSEU (online?\r\n HE40KEC315UWTS (Promo?\r\n LTDN58K700XWTSEU3D\r\n HE58KEC730UWTSD (online?\r\n LTDN65K700XWTSEU3D\r\n HE65KEC730UWTSD (online)\r\n LTDN55K720WTSEU\r\n HE55KEC710UCWTS (online?\r\n LTDN65K720WTSEU\r\n HE65KEC710UCWTS (online)\r\n LTDN65XT910WTSEU3D\r\n UB65EC905WTSGDEU (online)\r\n\r\nThe latest booking form (1-10-5657-0115-2016) added the following models to this list:\r\n\r\n{noformat}\r\nLTDN50K320UWTSEU\r\nLTDN40K320UWTSEU\r\nHE75K700UXWTS3D\r\nHE65M7000UWTSG\r\nHE55M7000UWTSG\r\nHE55K760UCWTS\r\nHE65K5500UWTS\r\nHE60K5500UWTS\r\nHE55K3300UWTS\r\nHE50K3300UWTS\r\nHE40K3300UWTS\r\nHE49K300UWTS\r\nHE43K300UWTS\r\nHE65MU9800UWTSG\r\nHE65MU9600UXWTS3D\r\nHE55MU9600UXWTS3D\r\nHE55MU8600UWTS\r\nHE65MU8600UWTS\r\n{noformat}\r\n\r\n\r\n", "Subtask": ["Not needed - Raise Operations Ticket for new client certificate root to integration, test, stage, live", "Create CATAL, TAL, iPlayer, Sport, News and RB+, MEH Configuration files on test", "Add user agent to Demi (Test and Live) [Deadline: 6 November 2015]", "Register Whoami string in Smartbridge DB for this range of device", "Not needed - Whitelist Static IP for CRB test stream access (CATAL)", "Add devices to inventory and update ticket title", "Device FIT test", "Test CATAL", "Test iPlayer", "Test News", "Test Sport", "Test RB+", "Change User Agent for Samsung JazzL", "Change keymapping for \"BACK\"", "Change User Agent for Samsung JazzL 2016 TV"], "ConsolidatedURL": ["IPLTVCERT-5049", "IPLTVCERT-5050", "IPLTVCERT-5051", "IPLTVCERT-5052", "IPLTVCERT-5053", "IPLTVCERT-5054", "IPLTVCERT-5055", "IPLTVCERT-5056", "IPLTVCERT-5057", "IPLTVCERT-5058", "IPLTVCERT-5059", "IPLTVCERT-5060", "IPLTVCERT-5324", "IPLTVCERT-5507", "IPLTVCERT-5508"]}},
        { "IPLTVCERT-4878": { "DeviceTitle": "Sony - Midrange - 2016 - TV", "Labels": ["certified"], "Description": "Device submitted for iPlayer, News, Sport and RB+ certification\r\n\r\nBrand: sony\r\nModel: tv_2016_midrange\r\n\r\nduplicated to:\r\nsony-tv_2016_midrange\r\n\r\nModels to be certified: Below mail from Sony\r\n----------------------------------------- -------------\r\nDear Elizabeth-san,\r\n \r\nI am sorry, please let us update the model list.\r\nI attach it.\r\n \r\nRegarding to FY16 Midrange model list,\r\n-----------------------------------\r\nKDL-ssWDxxx\r\n \r\nss : panel size\r\nxxx : model number\r\n-----------------------------------\r\nFor example,\r\nKDL-48WD653\r\nKDL-40WD653\r\nKDL-32WD603\r\nKDL-43WD753\r\nKDL-32WD753\r\nKDL-49WD755\r\nKDL-49WD757\r\nKDL-43WD757\r\nKDL-32WD757\r\nKDL-49WD759\r\nKDL-43WD759\r\nKDL-32WD759\r\n \r\n[note]\r\nKDL-ssRDxxx is the models without network features.\r\nPlease delete this.\r\n \r\nBest Regards,\r\nTakase\r\n \r\n", "Subtask": [ "Awaiting SSL Cert from Sony - Raise Operations Ticket for new client certificate root to integration, test, stage, live", "Create CATAL, TAL, iPlayer, Sport, News and RB+, MEH Configuration files on test", "Add user agent to Demi (Test and Live) [Deadline: 23 September]", "Register Whoami string in Smartbridge DB for this range of device", "Whitelist Static IP for CRB test stream access (CATAL)", "Add devices to inventory and update ticket title", "Test CATAL - Cycle 01 - FAIL", "Test iPlayer - Cycle 01 - CONDITIONAL PASS", "Test News - Cycle 01 - PASS", "Test Sport - Cycle 01 - PASS", "Test RB+ - Cycle 01 - PASS", "Push device configurations live - Jan 2016", "Validate live deployment", "Device FIT test", "Add duplicate set of configs ", "Remove old configs and add brand/model info to ", "Change DEMI Model name for Sony Midrange 2016 TV", "CATAL - Sometimes black screen flashes for 1-2 seconds after seeking in HLS video", "CATAL - Video quality is not good for \"SBR_42_PV16_PA6\" Dash and HLS video.", "CATAL - When Playfrom 10% is triggered, video resumes correctly but audio resumes after 2-3 seconds", "CATAL - Sometimes black screen continuously flashes bandwitdth is throttled in a Dash video.", "CATAL- Time value is lesser than the minimum range value in a Dash video", "CATAL- When Playfrom start or Playfrom 60s is triggered, few seconds from live point plays and then plays from the beginning of seekable range.", "CATAL - Sometimes video goes in buffering state in between playback and never resumes, User has to restart the TV to get back to normal.", "CATAL - Sometimes after seeking a \"Live2VOD USP Production 03AUG2015 HD 3200kbps\" video, black screen appears and audio continues in the background. (Observed only once)", "iPlayer - Device takes longer time to launch application and play content.", "Back journey from a deeplinked child app programme (for iPlayer) display black screen followed by VOD playback for fraction before returning to RB+." ], "ConsolidatedURL": [ "IPLTVCERT-4879", "IPLTVCERT-4880", "IPLTVCERT-4881", "IPLTVCERT-4882", "IPLTVCERT-4883", "IPLTVCERT-4884", "IPLTVCERT-4885", "IPLTVCERT-4886", "IPLTVCERT-4887", "IPLTVCERT-4888", "IPLTVCERT-4889", "IPLTVCERT-4890", "IPLTVCERT-4891", "IPLTVCERT-4892", "IPLTVCERT-4993", "IPLTVCERT-4994", "IPLTVCERT-5003", "IPLTVCERT-5351", "IPLTVCERT-5352", "IPLTVCERT-5353", "IPLTVCERT-5354", "IPLTVCERT-5355", "IPLTVCERT-5356", "IPLTVCERT-5357", "IPLTVCERT-5358", "IPLTVCERT-5359", "IPLTVCERT-5365" ] } }
        ],
        outerArr = [];

    json_data.forEach(function(nodes){

       var subtasks = [],
           ticketDetails = {};

        for (var tickets in nodes) {
            if (nodes.hasOwnProperty(tickets)) {
                ticketDetails["project_name"] = readConfig().Project;
                ticketDetails["ticket_id"] = tickets;
                ticketDetails["Device_Title"] = nodes[tickets].DeviceTitle;
                ticketDetails["Brand_model"] = getDemiName(nodes[tickets].Description);
                ticketDetails["Models"] = getModelsFromDescription(nodes[tickets].Description);
                ticketDetails["AssetNumber"] = getAssetIDFromDescription(nodes[tickets].Description);
              //  ticketDetails["RAMURL"] = getRAMSUrlFromDescription(nodes[tickets].Description);
                ticketDetails["TestRail"] = getTestRailURLFromDescription(nodes[tickets].Description);
                getSubtasks(nodes[tickets].Subtask).forEach(function (data) 
                {
                    subtasks.push(data);
                });

                ticketDetails["Task_status"] = subtasks;
                ticketDetails["consolidated_report"] = consolidatedReport(nodes[tickets].Subtask, nodes[tickets].ConsolidatedURL);
                ticketDetails["Labels"] = getJiraLabel(nodes[tickets].Labels);
                ticketDetails["Deployed_Status"] = liveDeployedDate(nodes[tickets].Subtask);
                ticketDetails["Description"] = nodes[tickets].Description;
                ticketDetails["user_agent"] = userAgent(nodes[tickets].Subtask, nodes[tickets].ConsolidatedURL);
               /* requestToGetSubtaskDesc(nodes[tickets].Subtask).forEach(function (data) 
                {
                    SubtaskIDs.push(data);
                });*/
            }
            outerArr.push(ticketDetails);
        }

    });

    return outerArr;
}

function getDemiName(description) 
{
    var reg = new RegExp(/.*Brand:\s(\w+)(?:\r\n|\r\n\r\n)Model:\s(\w+)/);
    var brand_mode = reg.exec(description);
    return brand_mode != null ? brand_mode[1] + "-" + brand_mode[2] : "NA";
}

function getModelsFromDescription(description) {
    if (description !== null) {
        var models = description.replace(/\r\n/g, "  ").match(/{noformat}(.*){noformat}/);
        return models !== null ? models[1] : "NA";
    } else {
        return "NA";
    }
}

function getAssetIDFromDescription(description)
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

function getSubtasks(tasks) {
//    var project_list = ["CATAL", "iPlayer", "News", "Sport", "RB+"];
    var project_list = readConfig().SubTasks,
        content = [];
    tasks.forEach(function (data) {
        if (data.search(/CLONE - Test/) === 0 || data.search(/Test \w+/) === 0) {
            for (var i = 0; i < project_list.length; i++) {
                if (data.match(project_list[i])) {
                    content[i] = ((data.match(/-(.*)/) != null) ? data.match(/-(.*)/)[1] : evaluateSubtask(data));
                }
            }
        }
    });
    return fill_empty_space(project_list, content);
}

function evaluateSubtask(task) {
    return ((task.match(/Cycle.*/) !== null)) ? task : "NA";
}

function fill_empty_space(project_list, subtask) {
    for (var i = 0; i < project_list.length; i++) {
        if (subtask[i] === undefined) subtask[i] = "NA";
    }
    return subtask;
}

function consolidatedReport(subtasks, consolidateID) {
    for (var i = 0; i < subtasks.length; i++) {
        if (subtasks[i].search(/Consolidated Report/) != 0) {
            var index = subtasks.indexOf("Consolidated Report ");
            return (consolidateID[index] === undefined) ? "NA" : consolidateID[index];
        }
    }
    return "NA";
}

function getJiraLabel(labels) 
{
    
    if (labels.indexOf("Android") != -1) 
    { return labels[labels.indexOf("Android")];
    } else if (labels.indexOf("iOS") != -1)
     {
        return labels[labels.indexOf("iOS")]
    } else {
        return "NA";
    }
}

function liveDeployedDate(subtasks) {
    for (var i = 0; i < subtasks.length; i++) {
        if (subtasks[i].search(/Push device configurations live -/) === 0) {
            var liveDepDate = subtasks[i].match(/(\d+\s\w+\s\d+)/);
            return (liveDepDate != null) ? liveDepDate[1] : "NA";
        }
    }
    return "NA";

}

function userAgent(subtasks, agentTicketId) {

    for (var i = 0; i < subtasks.length; i++) {
        if (subtasks[i].search(/Add user agent.*/i) == 0) {
            var index = i;
            return (agentTicketId[index] === undefined) ? "NA" : agentTicketId[index];
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

function nthIndex(str, pat, n) {
    var L = str.length, i = -1;
    while (n-- && i++ < L) {
        i = str.indexOf(pat, i);
        if (i < 0) break;
    }
    return i;
}

function readConfig(){
    var configuration = fs.readFileSync("configs/projectConfigs.json");
    return JSON.parse(configuration);
}

module.exports = {'jira': jiradata,
    'getFormattedData': getFormattedData,
    'getTableData': getTableData,
    'evaluateSubtask': evaluateSubtask,
    'liveDeployedDate': liveDeployedDate,
    'consolidatedReport': consolidatedReport,
    'userAgent': userAgent,
    'fetch_demi': fetch_demi,
    'nthIndex': nthIndex,
    'readConfig': readConfig};

