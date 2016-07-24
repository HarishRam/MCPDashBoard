var request = require("request"),
    baseUrl = "http://localhost:1344";

describe("Mobile Comptability Device Status", function(){

    describe("Get /", function(){

        it("returns status code 200", function(done){
            request.get(baseUrl, function(error, response, body){
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        it("returns Hello device cert app", function(done){
           request.get(baseUrl, function(error, response, body){
               expect(body).toBe("Hello to Device Cert Dashboard");
//               app.closeServer();
               done();
           });
        });

        it("returns valid canned data", function(done){
           request.get(baseUrl + "/canned", function(error, response, body){
                expect(response.statusCode).toBe(200);
              done();
           });
        });
    });
});