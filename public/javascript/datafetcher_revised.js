//var request = require('request-promise');
//var fs = require('fs');
//
////**************************** jira api request and json in response
//function jiradata(req_url){
//
//    var cert = fs.readFileSync("public/javascript/certs/vishal.pem");
//
//    return request({
//        url: req_url,
//        method: "GET",
//        headers: {
//            'Content-Type':'application/json'
//        },
//        cert: cert,
//        key: cert,
//        passphrase: 'vishal',
//        securityOptions: 'SSL_OP_NO_SSLv3'
////        strictSSL : true
//    }).then(function (body){
//            if(body)
//                try{
//                    return JSON.parse(body);
//                }catch (ex){
//                    console.error('error:', ex);
//                }
//        }).catch(function (reason) {
//            console.error("%s; %s", reason.error.message, reason.options.url);
//            console.log("%j", reason.response.statusCode);
//        });
//
//
//}
//
////  ************************** Fetching the relevant data from the source json
//function getFormattedData(source_data){
//
//    var outerarray = source_data.issues.map(function(issue){
//
//        return jiradata(issue.self).then(function(issue_url){
//            var issue_lists = {},
//            issue_details = {};
//
//
//            issue_details["DeviceTitle"] = issue_url.fields.summary;
//            issue_details["Labels"] = issue_url.fields.labels;
//            issue_details["Description"] = issue_url.fields.description;
//            issue_details["Subtask"] = issue_url.fields.subtasks.map(subtask => subtask.fields.summary);
//            issue_details["ConsolidatedURL"] = issue_url.fields.subtasks.map(selfs => selfs.key);
//
//            issue_lists[issue_url.key] = issue_details;
//
//        return issue_lists;
//        }).then(function(data){
//                return data;
//        });
//    });
//    return outerarray;
//}
//
//// *********************** Setting the fetched data and adding them in an array, which then use to display in the table
//function getTableData(results){
//
//    var json_data = eval(results) || [ {"IPLTVCERT-5048": {"DeviceTitle": "Samsung - JazzL - 2016 - TV - Tizen","Labels": ["2016","Samsung"],"Description": "Testing for iPlayer, News, Sport and RB+ certification\r\nBrand: samsung\r\nModel: tv_2016_jazzl_tizen\r\nModels to be certified: TBC","Subtask": ["Not needed - Raise Operations Ticket for new client certificate root to integration, test, stage, live","Create CATAL, TAL, iPlayer, Sport, News and RB+, MEH Configuration files on test","Add user agent to Demi (Test and Live) [Deadline: 6 November 2015]","Register Whoami string in Smartbridge DB for this range of device","Not needed - Whitelist Static IP for CRB test stream access (CATAL)","Add devices to inventory and update ticket title","Device FIT test","Test CATAL","Test iPlayer","Test News","Test Sport","Test RB+","Change User Agent for Samsung JazzL","Change keymapping for \"BACK\"","Change User Agent for Samsung JazzL 2016 TV"],"ConsolidatedURL": ["IPLTVCERT-5049","IPLTVCERT-5050","IPLTVCERT-5051","IPLTVCERT-5052","IPLTVCERT-5053","IPLTVCERT-5054","IPLTVCERT-5055","IPLTVCERT-5056","IPLTVCERT-5057","IPLTVCERT-5058","IPLTVCERT-5059","IPLTVCERT-5060","IPLTVCERT-5324","IPLTVCERT-5507","IPLTVCERT-5508"]}},
//            { "IPLTVCERT-4878": { "DeviceTitle": "Sony - Midrange - 2016 - TV", "Labels": ["certified"], "Description": "Device submitted for iPlayer, News, Sport and RB+ certification\r\n\r\nBrand: sony\r\nModel: hbbtv_2016_midrange\r\n\r\nduplicated to:\r\nsony-tv_2016_midrange\r\n\r\nModels to be certified: Below mail from Sony\r\n----------------------------------------- -------------\r\nDear Elizabeth-san,\r\n \r\nI am sorry, please let us update the model list.\r\nI attach it.\r\n \r\nRegarding to FY16 Midrange model list,\r\n-----------------------------------\r\nKDL-ssWDxxx\r\n \r\nss : panel size\r\nxxx : model number\r\n-----------------------------------\r\nFor example,\r\nKDL-48WD653\r\nKDL-40WD653\r\nKDL-32WD603\r\nKDL-43WD753\r\nKDL-32WD753\r\nKDL-49WD755\r\nKDL-49WD757\r\nKDL-43WD757\r\nKDL-32WD757\r\nKDL-49WD759\r\nKDL-43WD759\r\nKDL-32WD759\r\n \r\n[note]\r\nKDL-ssRDxxx is the models without network features.\r\nPlease delete this.\r\n \r\nBest Regards,\r\nTakase\r\n \r\n", "Subtask": [ "Awaiting SSL Cert from Sony - Raise Operations Ticket for new client certificate root to integration, test, stage, live", "Create CATAL, TAL, iPlayer, Sport, News and RB+, MEH Configuration files on test", "Add user agent to Demi (Test and Live) [Deadline: 23 September]", "Register Whoami string in Smartbridge DB for this range of device", "Whitelist Static IP for CRB test stream access (CATAL)", "Add devices to inventory and update ticket title", "Test CATAL - Cycle 01 - FAIL", "Test iPlayer - Cycle 01 - CONDITIONAL PASS", "Test News - Cycle 01 - PASS", "Test Sport - Cycle 01 - PASS", "Test RB+ - Cycle 01 - PASS", "Push device configurations live - Jan 2016", "Validate live deployment", "Device FIT test", "Add duplicate set of configs ", "Remove old configs and add brand/model info to ", "Change DEMI Model name for Sony Midrange 2016 TV", "CATAL - Sometimes black screen flashes for 1-2 seconds after seeking in HLS video", "CATAL - Video quality is not good for \"SBR_42_PV16_PA6\" Dash and HLS video.", "CATAL - When Playfrom 10% is triggered, video resumes correctly but audio resumes after 2-3 seconds", "CATAL - Sometimes black screen continuously flashes bandwitdth is throttled in a Dash video.", "CATAL- Time value is lesser than the minimum range value in a Dash video", "CATAL- When Playfrom start or Playfrom 60s is triggered, few seconds from live point plays and then plays from the beginning of seekable range.", "CATAL - Sometimes video goes in buffering state in between playback and never resumes, User has to restart the TV to get back to normal.", "CATAL - Sometimes after seeking a \"Live2VOD USP Production 03AUG2015 HD 3200kbps\" video, black screen appears and audio continues in the background. (Observed only once)", "iPlayer - Device takes longer time to launch application and play content.", "Back journey from a deeplinked child app programme (for iPlayer) display black screen followed by VOD playback for fraction before returning to RB+." ], "ConsolidatedURL": [ "IPLTVCERT-4879", "IPLTVCERT-4880", "IPLTVCERT-4881", "IPLTVCERT-4882", "IPLTVCERT-4883", "IPLTVCERT-4884", "IPLTVCERT-4885", "IPLTVCERT-4886", "IPLTVCERT-4887", "IPLTVCERT-4888", "IPLTVCERT-4889", "IPLTVCERT-4890", "IPLTVCERT-4891", "IPLTVCERT-4892", "IPLTVCERT-4993", "IPLTVCERT-4994", "IPLTVCERT-5003", "IPLTVCERT-5351", "IPLTVCERT-5352", "IPLTVCERT-5353", "IPLTVCERT-5354", "IPLTVCERT-5355", "IPLTVCERT-5356", "IPLTVCERT-5357", "IPLTVCERT-5358", "IPLTVCERT-5359", "IPLTVCERT-5365" ] } }],
//        ticketList = [], outerArray = [], innertArray = [], attachment = [], liveDeployStatus = [], status = [],
//        project_list=["CATAL","iPlayer","News","Sport","RB+"], subtask = [];
//
//    console.log("Source JSON ", json_data);
//
//    json_data.forEach(function(tickets){
//        for(var ticket in tickets){
//            if(tickets.hasOwnProperty(ticket)){
//                ticketList.push(ticket);
//            }
//        }
//    });
//
//    ticketList.forEach(function (ticket){
//        json_data.forEach(function(jdata){
//            if(jdata.hasOwnProperty(ticket)){
//
//                innertArray.push(ticket);
//                innertArray.push(jdata[ticket]["DeviceTitle"]);
//                innertArray.push(validateFields(jdata[ticket]["Description"]));
//                innertArray.push(getDemiName(jdata[ticket]["Description"]));
//                innertArray.push(getModelsFromDescription(jdata[ticket]["Description"]));
//
//                jdata[ticket]["Subtask"].forEach(function (tasks){
//                    if (tasks.search(/CLONE - Test/)===0 || tasks.search(/Test \w+/)===0){
//                        for(var i=0; i<project_list.length;i++){
//                            if(tasks.match(project_list[i])){
//                                (tasks.match(/-(.*)/) != null)? subtask.push(tasks.match(/-(.*)/)[1]) : subtask.push(evaluateSubtask(tasks));
//                            }
//                        }
//                    }else if(tasks.search(/Consolidated Report/) === 0){
//                        var index = jdata[ticket]["Subtask"].indexOf("Consolidated Report ");
//                        attachment.push(jdata[ticket]["ConsolidatedURL"][index]);
//                    }else if(tasks.search(/CLONE - Push/) === 0 || tasks.search(/Push device configurations live -/)===0){
//                        var liveDepDate = tasks.match(/.*Push device configurations live - (.*)/);
//                        liveDeployStatus.push(evaluateLiveDeploy(liveDepDate));
//                    }
//
//                });
//                status.push(getRelevantLabel(jdata[ticket]["Labels"]));
//            }
//        });
//
//    //  ************************************* Filling the NA for the empty content
////        if(liveDeployStatus.length === 0)
////        liveDeployStatus.push("NA");
//
//        for(var i=0;i<project_list.length;i++){
//            if(subtask[i] === undefined){
//                subtask.push("NA");
//            }
//        }
//
//        if(attachment.length === 0){
//            attachment.push("NA");
//        }else if(attachment.length === 2){
//            attachment.splice(0,1);
//        }
//
//
//        subtask.push(attachment);
//        subtask.push(status);
//        subtask.push(liveDeployStatus);
//        outerArray.push(innertArray.concat(subtask));
//
//        attachment=[];
//        innertArray=[];
//        subtask=[];
//        liveDeployStatus=[];
//        status=[];
//    });
//
//    return outerArray;
//}
//
////********************************** fetching labels from the tickets because there can be more than one label, we need
//// know the index of relevant labels
//
//function getRelevantLabel(labels){
//    if(labels.indexOf("certified") != -1){
//        return labels[labels.indexOf("certified")];
//    }else if(labels.indexOf("conditional_certified") != -1){
//        return labels[labels.indexOf("conditional_certified")]
//    }else{
//        return "NA";
//    }
//}
//
//
////*********************************** fetching Demi Brand and Model from the description
//function getDemiName(description){
//    var reg = new RegExp(/.*Brand:\s(\w+)\r\nModel:\s(\w+)/);
//    var brand_mode = reg.exec(description);
//    return brand_mode != null ? brand_mode[1]+"-"+brand_mode[2] : "NA"
//}
//
////*********************************** fetching the models from the description section of jira ticket
//function getModelsFromDescription(description){
//    if(description !== null){
//        var models = description.replace(/\r\n/g,"").match(/{noformat}(.*){noformat}/);
//        return models !== null? models[1] : "NA";
//    }else{
//        return "NA";
//    }
//}
//
//// ******************************** adding NA for missing fields from the json api
//function validateFields(fields){
//    return (fields === null) ? "NA" : fields
//}
//
//function evaluateSubtask(task){
//    return ((task.match(/Cycle.*/)!==null)) ? task : "NA" ;
//}
//
//function evaluateLiveDeploy(livedeploydate){
//    return (livedeploydate != null)? livedeploydate[1] : "";
//}
//
//
//
//module.exports = {'jira': jiradata,
//'getFormattedData': getFormattedData,
//'getTableData': getTableData,
//'evaluateSubtask': evaluateSubtask,
//'evaluateLiveDeploy': evaluateLiveDeploy};
//
