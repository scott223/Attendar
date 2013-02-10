//Attendar Cloud Code
//Copyright Scott Brugmans  & Bouke Nederstigt 2013
var eventModule = require('cloud/event.js');
var Event = eventModule.eventFunc();

var usersModule = require('cloud/user.js');

/*
 * retrieveEvents(start, forDays)
 * Retrieves all events for current user from given start date for given years
 * results are sorted by date and returned as array
 * @param start Date ISO-8601 string to define timespan start date
 * @param forDays integer how long the timespan is
 */
Parse.Cloud.define("retrieveEvents", function (request, response) {
    var moment = require('moment');
    if ((!moment(request.params.start).isValid()) || (!request.params.start)) {
        response.error("Invalid start date. Use param 'start'");
    }
    if ((request.params.forDays < 1) || (request.params.forDays > 100) || (!request.params.forDays)) {
        response.error("Invalid forDays. This has to be 0 < int < 101");
    }

    var nowMoment = moment(request.params.start); //USE THE TIMEZONE FROM THE USER!!!!!
    var endMoment = moment(request.params.start).add('days', request.params.forDays);
	
    
    var Events = new Array();
    
    function addEvent(mResults,datetime) {
    
		var event = {};
        event.title = mResults.get("title");
        event.location = mResults.get("location");
        event.datetime = datetime;
        event.invites = mResults.get("invites");
        event.eventid = mResults.id;
                     
        //var responsiveInvites = new Array();
        //var responses = { };
        
        //var relation = mResults.relation("responses");
        
        //var queryR = new Parse.Query(Response);
  		//queryI.equalTo("datetime",datetime);
		//queryR.equalTo("event",mResults);
		
		//console.log(queryR);
		
		//relation.query().find({
  		//	success: function(results) {
    	//		console.log("Successfully retrieved " + results.length + " scores.");
  		//	},
  		//	error: function(error) {
    	//		console.log("Error: " + error.code + " " + error.message);
  		//	}
		//});
		
        Events.push(event);
    }

    //var currentUser = Parse.User.current();
    var currentUser = { };
    currentUser.fbID = "1";
    currentUser.name = "a";
    
    var query = new Parse.Query(Event);
    //query.include("responses");
    //query.equalTo("owner",currentUser); //should only return events that somebody owns or is invited to!
    var usrObj = { };
    usrObj.name = currentUser.name;
    usrObj.fbID = currentUser.fbID;
    
    //query.containedIn("invites",new Array(usrObj));
    query.find({
        success: function (results) {
            for (var key in results) {
                if (results[key].get("recurring") == "single") { //SINGLE EVENT
                    var eventDate = moment(results[key].get("start_on"));
                    if ((eventDate >= nowMoment) && (eventDate <= endMoment)) { //is within timespan
                        addEvent(results[key],eventDate.toDate());
                    } //end if
                } //END SINGLE if
                if (results[key].get("recurring") == "daily") { //daily
                    var startOn = moment(results[key].get("start_on"));
                    if (startOn <= endMoment) { //starts somewhere in or before this timespan
                        var diffDays = Math.floor((nowMoment.diff(startOn, 'days', true)) / results[key].get("repeat_every"));
                        if (diffDays < 0) {
                            diffDays = 0;
                        } //end if
                        var i = diffDays;
                        while (moment(results[key].get("start_on")).add('days', (i * results[key].get("repeat_every"))) <= endMoment) { //as long as we have not reached our endMoment, create new instance
                            if (moment(results[key].get("start_on")).add('days', (i * results[key].get("repeat_every"))) >= nowMoment) { //check if this new instance is after our now moment
                                var eventDate = moment(results[key].get("start_on")).add('days', (i * results[key].get("repeat_every")));                            
                       			addEvent(results[key],eventDate.toDate());
                            } //end if
                            i++;
                        }
                    }
                } //END DAILY
                if (results[key].get("recurring") == "weekly") { //weekly
                    var startOn = moment(results[key].get("start_on")).day(0);
                    if (startOn <= endMoment) { //starts somewhere in or before this timespan
                        var diffWeeks = Math.floor((nowMoment.diff(startOn, 'weeks', true)) / results[key].get("repeat_every"));
                        if (diffWeeks < 0) {
                            diffWeeks = 0;
                        }
                        var i = diffWeeks;
                        var instanceWeekDays = results[key].get("repeat_on");
                        while (moment(results[key].get("start_on")).add('weeks', (i * results[key].get("repeat_every"))) <= endMoment) { //check if this week falls before the endMoment
                            for (var day in instanceWeekDays) {
                                var eventDate = moment(results[key].get("start_on")).add('weeks', (i * results[key].get("repeat_every"))).day(day).hours(instanceWeekDays[day].h).minutes(instanceWeekDays[day].m);
                                if ((eventDate >= nowMoment) && (eventDate <= endMoment)) { //is within timespan sanity check
                       				addEvent(results[key],eventDate.toDate());
                                }
                            }
                            i++;
                        }
                    }
                } //END WEEKLY
                if (results[key].get("recurring") == "monthly") { //monthly
                    var startOn = moment(results[key].get("start_on")).date(1);
                    if (startOn <= endMoment) { //starts somewhere in or before this timespan
                        var diffMonths = Math.floor((nowMoment.diff(startOn, 'months', true)) / results[key].get("repeat_every"));
                        if (diffMonths < 0) {
                            diffMonths = 0;
                        }
                        var i = diffMonths;
                        var instanceMonthDays = results[key].get("repeat_on");
                        while (moment(results[key].get("start_on")).add('months', (i * results[key].get("repeat_every"))) <= endMoment) { //check if this month falls before the endMoment
                            for (var day in instanceMonthDays) {
                                var eventDate = moment(results[key].get("start_on")).add('months', (i * results[key].get("repeat_every"))).date(day).hours(instanceMonthDays[day].h).minutes(instanceMonthDays[day].m);
                                if ((eventDate >= nowMoment) && (eventDate <= endMoment)) { //is within timespan sanity check
           							addEvent(results[key],eventDate.toDate());
                                }
                            }
                            i++;
                        }
                    }
                } //END MONTHLY
            }

            function sortFunction(a, b) {
                return (a.datetime - b.datetime);
            }
            Events.sort(sortFunction);
            response.success(Events);
        },
        error: function (error) {
            response.error(error);
        }
    });
});

//registerNewUser
//Pulls current user facebook data (name, email, gender, location, fbID & friends) and adds this to local parse database
//user refresh on client side recommended!
//returns succes(200) on successfull pull or error(error) on error.
Parse.Cloud.define("registerNewUser", function (request, response) {
    usersModule.registerNewUser(response);
});

/* why needed??
//Create event
//@param name event name
//@param datetime date and time of event
//@param location location of event
Parse.Cloud.define("createSingleEvent", function (request, response) {

    var event = Event.createSingleEvent(request.params.title, request.params.datetime, request.params.location);

    event.save(null, {
        success: function (event) {
            response.success('200');
        },
        error: function (event, error) {
            response.error(error);
        }
    });

});

*/


/*
 * Create event, possibly recurrent
 */
Parse.Cloud.define("createEvent", function (request, response) {
    var event = Event.createEvent(request.params.title, //string
    
    request.params.location, //string
    request.params.invites, //array
    request.params.start_on, //date
    request.params.recurring, //string
    request.params.repeat_every, //integer
    request.params.repeat_on); //array

    event.save(null, {
        success: function (event) {
            response.success(event);
        },
        error: function (event, error) {
            response.error(error);
        }
    });

});

Parse.Cloud.define("updateEventResponse", function (request,rresponse) {

	var moment = require('moment');
	
	var Response = Parse.Object.extend("Response");
	var Event = Parse.Object.extend("Event");
	
	var eventQuery = new Parse.Query(Event);
	
	eventQuery.get(request.params.eventID, {
		success: function(event) {
		
			//first find out if there is already a response
	
			var query = new Parse.Query(Response);
	
			query.equalTo("datetime",moment(request.params.datetime).toDate());
			query.equalTo("event",event);
			query.equalTo("inviteeFB",request.params.inviteeFB);
	
			console.log(query);
	
			query.first({
				success: function(response) {
					if (!response) {
						var response = new Response();
						
						//var ACL = new Parse.ACL();
						
						//ACL.setPublicWriteAccess(true);
						
						//response.setACL(ACL);
												
						console.log("no reponse yet, creating...");
					} else {
						console.log("already a response!");
					}			
			
					response.set("event",event);
					response.set("datetime",moment(request.params.datetime).toDate());
					response.set("inviteeFB",request.params.inviteeFB);
					response.set("response",request.params.response);
	
					response.save(null, {
  						success: function(response) {
  						
  							var relation = event.relation("responses");
  							relation.add(response);
  							event.save(null, {
  								success: function(event) {
  								    rresponse.success(response);
  								
  								},
  								error: function(response, error) {
									rresponse.error(error);
  								}
  							});
    						
  						},
  						error: function(response, error) {
							rresponse.error(error);
  						}
					});
				},
				error: function(error) {
					rresponse.error(error);
				}
			});
			
		},
		error: function(object, error) {
			rresponse.error("This event does not exist.");
		}
	});
			
	
});