//Attendar events
//@Author Bouke Nederstigt
//@Copyright Bouke Nederstigt & Scott Brugmans 2013


var Event = Parse.Object.extend("Event",{
	//instance methods
	
	//retrieve single event
	//contains all event data, invitees and responses
	singleEvent: function (event){
		
	},	
	
},{
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
		var Event = new Event();
		
		//pulls current user data
		var currentUser = Parse.User.current();
		
		//set data
		Event.set("name", name);		
		Event.set("owner", currentUser);
		Event.set("start", start);
		Event.set("location", location);
		
		Event.save(null, {
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

