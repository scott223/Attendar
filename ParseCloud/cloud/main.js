//Attendar Cloud Code
//Copyright Scott Brugmans  & Bouke Nederstigt 2013



//pullEvents
Parse.Cloud.define("pullEvents", function(request, response) {

	var Events = { };
	for (var i = 0; i<5; i++) {
		var Event = { };
		

		Event.title = 'Avond eten ' + i;

		Event.id = i;
		
		Events[i] = Event;
	}
	
	response.success(Events);
		
});

Parse.Cloud.define("test", function(request, response) {

	var module = require('cloud/user.js');
	
	response.success(module.Test());

});

//pullFacebookData()
//Pulls current user facebook data (name, email, gender, location, fbID & friends) and adds this to local parse database
//user refresh on client side recommended!
//returns succes(200) on successfull pull or error(error) on error.
Parse.Cloud.define("pullFacebookData", function(request, response) {

//pulls current user adata
var currentUser = Parse.User.current();

//check if user is found
if (currentUser) {
    
    //get user facebook auth data
    var authData = currentUser.get("authData");
    
 //make a new facebook request with the user auth data and request fields
 Parse.Cloud.httpRequest({
  url: 'https://graph.facebook.com/' +authData.facebook.id,
  params: {
  
  	fields : 'id,name,email,gender,location,friends',
    access_token : authData.facebook.access_token
  
  },
  
  success: function(httpResponse) {
    
    //parse JSON
    resultaat = JSON.parse(httpResponse.text);
    
	currentUser.set("fbFriendsArray",resultaat.friends.data);
	currentUser.set("email",resultaat.email);
	currentUser.set("name",resultaat.name);
	currentUser.set("gender",resultaat.gender);
	currentUser.set("location",resultaat.location.name);
	currentUser.set('fbID',parseInt(resultaat.id));
	
	//save current user
	currentUser.save(null, {
    
    	success: function(currentUser) {
    	response.success('200');
    	
  },
  error: function(currentUser, error) {
    
    //return error in saving
    response.error(error);
  }
});

  },
  error: function(httpResponse) {
    
    //save httpresponse error
    console.error('Request failed with response code ' + httpResponse.status);
  }
});
    
 } else {
  
  //return error because user not found
  response.error('user not found');
  }
  
});
//end of pullFacebookData

//Create event
Parse.Cloud.define("createSingle", function(request, response){
	var Event = require('cloud/event.js');	
	console.log(Event);
	var event = Event.createSingle(request.params.name, request.params.start, request.params.location);
	console.log(event);
	response.success(event);
});
