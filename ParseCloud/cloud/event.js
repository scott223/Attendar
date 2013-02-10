//Attendar events
//@Author Bouke Nederstigt
//@Copyright Bouke Nederstigt & Scott Brugmans 2013
exports.eventFunc = function () {
	var Event = Parse.Object.extend( {
		className: "Event",
        //instance methods

        //retrieve single event
        //contains all event data, invitees and responses
        singleEvent: function (event) {

        },
        
        retrieveEvents: function (){
        	
        	

        }
        
    }, {
        //class methods

        //create recurring event
        
        //TODO works for now, need ALLOT OF CHECKING!!
        createEvent: function (title, location, invites, start_on, recurring, repeat_every, repeat_on) {
        	
        	var moment = require('moment');
        	
        	var event = new Event();
        	  	
        	//set title
        	//TODO: title should be string and not to long
        	event.set("title", title);
        	
        	//set location
    		//TODO: location should be string and not to long
        	event.set("location", location);
        
        	//set invites
        	//TODO: invites should look like this (array with objects!)
        	// [
        	//	{"12345":"Scott Brugmans"},
        	// 	{"38477":"Bouke Nederstigt"}
        	// ]
        		
        	event.set("invites",invites);
        	
        	/*
        	if(invites != null){
        		var checked_invites = invites;        	      	
            	for (var i=0; i< checked_invites.length; i++){
            		if(!isNumber(checked_invites[i])){
            			checked_invites.splice(i, 1);
            		}
            	}            	
            	event.set("invites", checked_invites);
        	}   	
        	        	
        	*/
        	
        	//set owner
        	//TODO: check if user is present
        	var currentUser = Parse.User.current();       
        	event.set("owner", currentUser);
        	
        	//set start on
        	//if (!moment(start_on).isValid())
        	//	return false;
        	//}       	
        	//TODO: should check if this is a correct date      	
        	event.set("start_on", moment(start_on).toDate());
         	
        	//set recurring type
            if(recurring == "single" || recurring == "daily" || recurring == "weekly" || recurring == "monthly"){
            	event.set("recurring", recurring);
            }
            
            /*
            //set end on
            if(end_on != null && recurring != single){//single type has no end
            	//check if end on is valid date
            	end_on = moment(end_on, "YYYY-MM-DDTHH:mm");
            	if(moment(end_on).isValid() != true){
            		return false;
            	}
            	
            	//check if end is more than one day in the future
            	if(recurring == daily && end_on > moment(start_on).add('days', 1)){
            		event.set("end_on", end_on);
            	}
            	
            	//check if end is more than a week in the future
            	if(recurring == weekly && end_on > moment(start_on).add('weeks', 1)){
            		event.set("end_on", end_on);
            	}
            	
            	//check if end is more than a month in the future
            	if(recurring == monthly && end_on > moment(start_on).add('months', 1)){
            		event.set("end_on", end_on);
            	}
            }
            */
        	
        	//set repeat_every
        	//TODO should be a number (probably between 1 and 5 or something like that)
        	if (isNumber(repeat_every)) { 
        		event.set("repeat_every", repeat_every);
        		} else {
        		return false;
        	}
        	
        	//set repeat-on STILL NEED CHECK
        	//TODO needs to be in the formate
        	// {
        	//	{"2":{
        	//		"h":"4",
        	//		"m":"30"}
        	//		},
        	// 	{"5":{
        	//		"h":"2",
        	//		"m":"10"}
        	//		}
        	// }
        	event.set("repeat_on",repeat_on);
        	
        	return event;
        	
        },

        /*
         * Create single event
         * @param name event name	 
         * @param datetime occurence of the event
         * @param location location of the event
         * @return Event on succes, error on failure
         */
        createSingleEvent: function (title, start_on, location) {
            //instantiate new event
            var event = new Event();

            //pulls current user data
            var currentUser = Parse.User.current();

            //set data
            //set data
            event.set("title", title);
            event.set("owner", currentUser);
            
            event.set("recurring","single");
            event.set("start_on",new Date(datetime));
        	event.set("location", location); 
        	
            var expression = { };
            event.set("expression", expression);

            return event;
        },

        //remove event
        removeEvent: function (event) {

        },

        //edit event
        editEvent: function (event, title, expression, owner, start, location) {

        }

    });

    return Event;
    
    /*
     * Function to check if a var is a number
     */
    function isNumber (o) {
    	return ! isNaN (o-0);	
	}
}
