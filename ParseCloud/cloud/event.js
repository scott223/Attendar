//Attendar events
//@Author Bouke Nederstigt
//@Copyright Bouke Nederstigt & Scott Brugmans 2013

exports.eventFunc(){

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

