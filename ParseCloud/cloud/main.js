//Attendar Cloud Code
//Copyright Scott Brugmans  & Bouke Nederstigt 2013
var eventModule = require('cloud/event.js');
var Event = eventModule.eventFunc();
 
var usersModule = require('cloud/user.js');
 
//pullEvents
Parse.Cloud.define("retrieveEvents", function (request, response) {
 
     var moment = require('moment');
     
     if (!moment(request.params.start)) {
     	response.error("Invalid start date. Use param 'start'");
     }
     
     if ((request.params.forDays < 1) || (request.params.forDays > 31)) {
     	response.error("Invalid forDays. This has to be 0 < int < 32");
     }
     
     var nowMoment = moment(request.params.start); //USE THE TIMEZONE FROM THE USER!!!!!
     var endMoment = moment(request.params.start).add('days',request.params.forDays);
     
     var Events = new Array();
     
    //var currentUser = Parse.User.current();
     var query = new Parse.Query(Event);            
         
    //query.equalTo("owner",currentUser); //should only return events that somebody owns or is invited to!
     
     query.find({        
       success: function(results) {                
           
        	for (var key in results) {
        	
        		if (results[key].get("recurring") == "single") { //SINGLE EVENT
        		        		
        			var eventDate = results[key].get("start_on");
        			        			
        			if ((eventDate >= nowMoment) && (eventDate <= endMoment)) { //is within timespan
        				var event = { };

        				event.title = results[key].get("title");
        				event.location = results[key].get("location");
        				event.datetime = eventDate;
        		
        				Events.push(event);
        		
        			}
        		    
        		} //END SINGLE
        		
        		if (results[key].get("recurring") == "daily") { //daily
        		
        			var startOn = moment(results[key].get("start_on"));
        			
        			if (startOn <= endMoment) { //starts somewhere in or before this timespan
        			
        				var i = 0;
        				
        				while (moment(results[key].get("start_on")).add('days',(i * results[key].get("repeat_every"))) <= endMoment) { //as long as we have not reached our endMoment, create new instance
        				
        					if (moment(results[key].get("start_on")).add('days',(i * results[key].get("repeat_every"))) >= nowMoment) { //check if this new instance is after our now moment
        					
        						var event = { };
								event.title = results[key].get("title");
        						event.location = results[key].get("location");
        						event.datetime = moment(results[key].get("start_on")).add('days',(i * results[key].get("repeat_every"))); //calculate new instance date
        		
        						Events.push(event); //addit
        					
        					}
        				
        					i++;
        					
        				}
        			
        			}
        	
        		} //END DAILY
        		
        		if (results[key].get("recurring") == "weekly") { //weekly
        		
        		    var startOn = moment(results[key].get("start_on"));
        			
        			if (startOn <= endMoment) { //starts somewhere in or before this timespan
        			
        			
        			
        			
        			}
        		
        		}
        	
        	}
            
            response.success(Events);
           
        },
        error: function(error) {            
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

 
/*
 * Create event, possible recurrent
 */
Parse.Cloud.define("createEvent", function(request, response){	
	var event = Event.createEvent(request.params.title, 
			request.params.location, 
			request.params.invites, 
			request.params.start_on, 
			request.params.recurring, 
			request.params.repeat_every, 
			request.params.repeat_on);
	
	event.save(null, {
        success: function (event) {
            response.success('200');
        },
        error: function (event, error) {
            response.error(error);
        }
    });	
	
});

