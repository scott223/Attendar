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
        	
        	//set invites, first remove non integers  
        	if(invites != null){
        		var checked_invites = invites;        	      	
            	for (var i=0; i< checked_invites.length; i++){
            		if(!isInteger(checked_invites[i])){
            			checked_invites.splice(i, 1);
            		}
            	}
            	
            	event.set("invites", checked_invites);
        	}   	
        	        	
        	//set owner
        	var currentUser = Parse.User.current();       
        	//event.set("owner", currentUser);
        	
        	//set start on     
        	event.set('start_on', start_on);
        	
        	//set end on
        	
        	//set recurring type
        	
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
        createSingleEvent: function (title, datetime, location) {
            //instantiate new event
            var event = new Event();

            //pulls current user data
            var currentUser = Parse.User.current();

            //set data
            event.set("title", title);
            event.set("owner", currentUser);
            
            var expression = { };
            
            expression.recurring = 'single';
            expression.datetime = new Date(datetime);
            
            event.set("expression", expression);

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
}
