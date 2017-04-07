var axios = require('axios');

var id = "MY_CLIENT_ID";
var sec = "MY_SECRET_ID";
//In case we need to pass in API key
var param = "?client_id" + id + "&client_secret=" + sec;

function getUserInfo (username) {
  return axios.get('https://api.github.com/users/' + username);
}

var helpers = {
  //Loop over every user name in players array (using .map)
  //For each user name in array call .getUserInfo
  //Passes array of promises to axios, when those get resolved it
  getPlayersInfo: function (players) {
    // fetch some data from Github
    return axios.all(players.map(function (username) {
      return getUserInfo(username)
    })).then(function (info) {
      console.log("Info: ", info);
      //target .data JSON element, map it for each user
      //This promise ultimately hits ConfirmBattleContainer as a promise
      //where it was originally invoked! Sweeeeet.
      return info.map(function (user) {
        return user.data;
      })
    //Error handling
    }).catch(function (error) {
      console.warn('Error in getPlayersInfo', error);
    })
  }
};

module.exports = helpers;
