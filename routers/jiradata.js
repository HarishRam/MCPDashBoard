var express = require('express'),
    router = express.Router(),
    fetchdata = require('../public/javascript/datafetcher.js'),
    cache = require('memory-cache');


router.get('/json/:years?', function (req, res, next) {

//    ****************** If the user does not passes the year then default will be 2016
    var years = (req.params.years === undefined) ? "2013, 2014, 2015, 2016" : req.params.years,

      url = "https://jira.dev.bbc.co.uk/rest/api/2/search/?"+fetchdata.readConfig().JQLQuery.replace("years", years);
// url = "https://jira.dev.bbc.co.uk/rest/api/2/search/?"+"jql=project in (MCP) AND issuetype='Task'"

//    ****************** jira api request to get the ticket json
    if (cache.size() == 0 || cache.get(years) == null) {
        cache.put(years, fetchdata.jira(url), 43200000);
    }


    var pro = new Promise(function (resolve, reject) {
        resolve(cache.get(years));
    }).catch(function (err) {
            console.error("Error " + err.stack);
    });

    pro.then(function (tickets) {
        var ticketsPromise = [];

        if (cache.get(years+"-Formatted") == null) {
            fetchdata.getFormattedData(tickets).forEach(function (promise) {
                ticketsPromise.push(promise);
            });
            cache.put(years+"-Formatted", ticketsPromise, 43200000);
        }
        return cache.get(years +"-Formatted");
    }).then(function (promises) {
            return Promise.all(promises).then(function (ticket) {
                return JSON.stringify(ticket, null, '  ');
            });
        }).then(function (result) {
//            console.log("Data to pass on methods",result);

            var outerArray = fetchdata.getTableData(result);

            res.write(JSON.stringify(outerArray));
            res.end();

        }).catch(function (err) {
            console.error("Error " + err.stack);
        });

});

//    *********************** Picking up the canned data
router.get('/jira/:yrs?', function (req, res, next) {

//    var outerArray = fetchdata.getTableData();
    var moment = (req.params.yrs === undefined) ? "2013, 2014, 2015, 2016" : req.params.yrs;



    res.render('index', {
        title: 'Jira Board',
        fetchYears: moment,
        colHeaders: fetchdata.readConfig().ColHeader
//        ticketsDetails: outerArray
    });
});

router.get('/clearCache/', function(req, res, next){
    if(cache.size() > 0){
        res.send("<h3> Clearing all the cache </h3><br> " +
            "Caches at present : "+cache.keys()+
            "<br> Cache size at present "+ cache.size());
        cache.clear();
    }else{
        res.send("<h3>No Cache is available to clear</h3>");
    }
});

router.get('/validate/:jiraid', function (req, res, next) {
    var jira_id = req.params.jiraid,
        demi_url = "https://jira.dev.bbc.co.uk/rest/api/2/issue/" + jira_id,
        demi_ticket_details = fetchdata.jira(demi_url);

    var prom = new Promise(function (resolve, reject) {
        resolve(demi_ticket_details);
    }).catch(function (err) {
            console.error("Error " + err.stack);
    });

    prom.then(function (demi) {
//       console.log("demi outcome ", demi);

        var regex = new RegExp(/.*User Agents?:.*{noformat}(.*).*/gi),
            description = demi.fields.description.replace(/\r\n/g, " ").replace(/\n/g, " ").replace(/\"/g, "\'"),
            index_second_appears = fetchdata.nthIndex(description, "{noformat}", 2),
            discription = description.slice(0, index_second_appears),
            user_agent_string = regex.exec(discription);


        console.log("Description ", description);
        console.log("user_agent_string ", user_agent_string);

        return user_agent_string;

    }).then(function (details) {

            if (details === null) return "null";

            console.log("Testing User Agent", details[1]);
            var expected_demi_details = fetchdata.fetch_demi(details[1]);

            return Promise.resolve(expected_demi_details).then(function (values) {
                console.log("Wurl details ", values);
                return values;
            });
        }).then(function (result) {
            console.log("Response :", result);
            res.write(JSON.stringify(result));
            res.end();
        }).catch(function (err) {
            console.error("Error " + err.stack);
        });
});

module.exports = router;