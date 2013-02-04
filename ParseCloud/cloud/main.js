//Attendar Cloud Code
//Copyright Scott Brugmans  & Bouke Nederstigt 2013
var eventModule = require('cloud/event.js');
var Event = eventModule.eventFunc();

var usersModule = require('cloud/user.js');

//pullEvents
Parse.Cloud.define("retrieveEvents", function (request, response) {
    
    var event = new Event();
	var events = event.retrieveEvents();
	
	response.success(events);

});

//registerNewUser
//Pulls current user facebook data (name, email, gender, location, fbID & friends) and adds this to local parse database
//user refresh on client side recommended!
//returns succes(200) on successfull pull or error(error) on error.
Parse.Cloud.define("registerNewUser", function (request, response) {
    usersModule.registerNewUser(response);
});

//Create event
//@param name event name
//@param datetime date and time of event
//@param location location of event
Parse.Cloud.define("createSingleEvent", function (request, response) {

    var event = Event.createSingleEvent(request.params.name, request.params.datetime, request.params.location);

    event.save(null, {
        success: function (event) {
            response.success('200');
        },
        error: function (event, error) {
            response.error(error);
        }
    });
});

