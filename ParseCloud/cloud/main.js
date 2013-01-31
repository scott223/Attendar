
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
//Parse.Cloud.define("hello", function(request, response) {
//  response.success("Hello world!");
//});


//pullFacebookData()
//Pulls current user facebook data (name, email, gender, location, fbID & friends) and adds this to local parse database
//user refresh on client side recommended
//returns succes(200) on succesfull pull or error(error) on error.

Parse.Cloud.define("pullFacebookData", function(request, response) {

var currentUser = Parse.User.current();
if (currentUser) {
    
    var authData = currentUser.get("authData");
    
 Parse.Cloud.httpRequest({
  url: 'https://graph.facebook.com/' +authData.facebook.id,
  params: {
  	fields : 'id,name,email,gender,location,friends',
    access_token : authData.facebook.access_token
  },
  success: function(httpResponse) {
    resultaat = JSON.parse(httpResponse.text);
    
	currentUser.set("fbFriendsArray",resultaat.friends.data);
	currentUser.set("email",resultaat.email);
	currentUser.set("name",resultaat.name);
	currentUser.set("gender",resultaat.gender);
	currentUser.set("location",resultaat.location.name);
	currentUser.set('fbID',parseInt(resultaat.id));
	currentUser.save(null, {
    success: function(currentUser) {
    response.success('200');
  },
  error: function(currentUser, error) {
    response.error(error);
  }
});

  },
  error: function(httpResponse) {
    console.error('Request failed with response code ' + httpResponse.status);
  }
});
    
 
 } else {
  
  response.success('user not found');
  
  }
  
});

