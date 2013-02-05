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
        createEvent: function (title, location, invites, start_on, recurring, repeat_every, repeat_on) {
        	var moment = require('moment');
        	var event = new Event();
        	 console.log(title);       	
        	//set title
        	event.set("title", title);
        	
        	//set location
        	event.set("location", location);
        	console.log(invites);
        	//set invites, first remove non integers  
        	if(invites != null){
        		var checked_invites = invites;        	      	
            	for (var i=0; i< checked_invites.length; i++){
            		if(!isNumber(checked_invites[i])){
            			checked_invites.splice(i, 1);
            		}
            	}            	
            	event.set("invites", checked_invites);
        	}   	
        	        	
        	//set owner
        	var currentUser = Parse.User.current();       
        	//event.set("owner", currentUser);
        	
        	//set start on
        	if(start_on == false){
        		return null//impossible to set date withtou start
        	}
        	
        	//start_on = new Date(start_on);
        	//create date/moment object and check if supplied date is valid
        	start_on = moment(start_on, "YYYY-MM-DDTHH:mm");
        	if(moment(start_on).isValid() != false){
        		event.set("start_on", start_on); 
        	}      
         	
        	//set recurring type
            if(recurring == single || recurring == daily || recurring == monthly){
            	event.set("recurring", recurring);
            }
            
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
        	
        	//set recurring
        	
        	//set repeat-every
        	
        	//set repeat-on
        	
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
            event.set("title", title);
            event.set("owner", currentUser);
            event.set("recurring", single);
            
            start_on = new Date(start_on);            
            event.set("start_on", start_on);
            event.set("location", location);

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
