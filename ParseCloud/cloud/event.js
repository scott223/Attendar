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
