//Attendar user functions
//@Author Bouke Nederstigt
//@Copyright Bouke Nederstigt & Scott Brugmans 2013

exports.registerNewUser = function (response) {

    var currentUser = Parse.User.current();

    //check if user is found
    if (currentUser) {

        //get user facebook auth data
        var authData = currentUser.get("authData");

        //make a new facebook request with the user auth data and request fields
        Parse.Cloud.httpRequest({
            url: 'https://graph.facebook.com/' + authData.facebook.id,
            params: {
                fields: 'id,name,email,gender,location,friends',
                access_token: authData.facebook.access_token
            },

            success: function (httpResponse) {
                //parse JSON
                resultaat = JSON.parse(httpResponse.text);

                currentUser.set("email", resultaat.email);
                currentUser.set("name", resultaat.name);
                currentUser.set("gender", resultaat.gender);
                currentUser.set("location", resultaat.location.name);
                currentUser.set('facebookID', parseInt(resultaat.id));

                var FacebookFriends = Parse.Object.extend("FacebookFriends");
                var facebookFriends = new FacebookFriends();

                facebookFriends.set("user", currentUser);
                facebookFriends.set("friends", resultaat.friends.data);

                //save current user
                currentUser.save(null, {

                    success: function (currentUser) {
                        facebookFriends.save(null, {
                            success: function (facebookFriends) {
                                response.success('200');

                            },
                            error: function (facebookFriends, error) {
                                //return error in saving
                                response.error(error);
                            }
                        });

                    },
                    error: function (currentUser, error) {
                        //return error in saving
                        response.error(error);
                    }
                });

            },
            error: function (httpResponse) {
                //save httpresponse error
                console.error('Request failed with response code ' + httpResponse.status);
            }
        });

    } else {
        //return error because user not found
        response.error('User not found');
    }

}