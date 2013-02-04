//Attendar events
//@Author Bouke Nederstigt
//@Copyright Bouke Nederstigt & Scott Brugmans 2013
exports.eventFunc = function () {

<<<<<<< HEAD
exports.eventfunc = function(){

	var Event = Parse.Object.extend("Event",{
		//instance methods
		
		//retrieve single event
		//contains all event data, invitees and responses
		singleEvent: function (event){
			
		}	
		
	}, {
		//class methods
		
		//create recurring event
		createEvent: function(name, expression, owner, start, location){
			
		},
		
		/*
		 * Create single event
		 * @param name event name	 
		 * @param start first (and in this case only) occurence of the event
		 * @param location location of the event
		 * @return Event on succes, error on failure
		 */
		createSingle: function(name, start, location){
			//instantiate new event
			var event = new Event();
			
			//pulls current user data
			var currentUser = Parse.User.current();
			
			//set data
			event.set("name", name);		
			event.set("owner", currentUser);
			event.set("start", start);
			event.set("location", location);
			
			event.save(null, {
				success: function(Event){
					return Event;
				},
				error: function(Event, error){
					return error.code;
				}
			});
		},	
		
		//return all events within a certain timespan
		retrieveEvents: function(range){
			
		},
		
		//remove event
		removeEvent: function (event){
			
		},
		
		//edit event
		editEvent: function (event, name, expression, owner, start, location){
			
		}	
	
	});
	
	return Event;
}
=======
    var Event = Parse.Object.extend("Event", {
        //instance methods
>>>>>>> heleboel

        //retrieve single event
        //contains all event data, invitees and responses
        singleEvent: function (event) {

        },
        
        //return all events within a certain timespan
        retrieveEvents: function() {
        
        	console.log('retrieving events');
        	
            var query = new Parse.Query("Event");
            //var currentUser = Parse.User.current();	
        	
        	//query.equalTo("owner",currentUser);
        	
        	query.find({
  				success: function(results) {
  					return(results);
  				},
  				error: function(error) {
    				return(error);
  				}
			});   	

        }

    }, {
        //class methods

        //create recurring event
        createEvent: function (name, expression, owner, start, location) {

        },

        /*
         * Create single event
         * @param name event name	 
         * @param datetime occurence of the event
         * @param location location of the event
         * @return Event on succes, error on failure
         */
        createSingleEvent: function (name, datetime, location) {
            //instantiate new event
            var event = new Event();

            //pulls current user data
            var currentUser = Parse.User.current();

            //set data
            event.set("name", name);
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
        editEvent: function (event, name, expression, owner, start, location) {

        }

    });

    return Event;
}
