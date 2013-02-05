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
        	event.set("title", title);
        	
        	//set location
        	event.set("location", location);
        
        	//set invites, first remove non integers  
        	
        	
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
        	
        	//var currentUser = Parse.User.current();       
        	//event.set("owner", currentUser);
        	
        	//set start on
        	//if (!moment(start_on).isValid())
        	//	return false;
        	//}       	
        	      	
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
        	
        	//set repeat_every STILL NEED CHECK
        	if (isNumber(repeat_every)) { 
        		event.set("repeat_every", repeat_every);
        		} else {
        		return false;
        	}
        	
        	//set repeat-on STILL NEED CHECK
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
