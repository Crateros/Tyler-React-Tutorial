var axios = require('axios');

var id = "MY_CLIENT_ID";
var sec = "MY_SECRET_ID";
//In case we need to pass in API key
var param = "?client_id" + id + "&client_secret=" + sec;

function getUserInfo (username) {
  return axios.get('https://api.github.com/users/' + username);
}

// fetch usernames repos
function getRepos (username) {
  return axios.get('https://api.github.com/users/' + username + '/repos');
}

// calculate all the stars from user repos
function getTotalStars (repos) {
  return repos.data.reduce(function (prev, current) {
    return prev + current.stargazers_count
  }, 0);
}

// get repos
// getTotalStars
// return object with that data
function getPlayersData (player) {
  return getRepos(player.login)
  .then(getTotalStars)
  .then(function (totalStars) {
    return {
      followers: player.followers,
      totalStars: totalStars
    }
  })
}

// return an array, after doing algorithms to determine winner
function calculateScores (players) {
  return [
    players[0].followers * 3 + players[0].totalStars,
    players[1].followers * 3 + players[1].totalStars
  ]
}

//Loop over every user name in players array (using .map)
//For each user name in array call .getUserInfo
//Passes array of promises to axios, when those get resolved it
var helpers = {
  // fetch some data from Github
  getPlayersInfo: function (players) {
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
  },
  battle: function(players) {
    var playerOneData = getPlayersData(players[0]);
    var playerTwoData = getPlayersData(players[1]);

    return axios.all([playerOneData, playerTwoData])
    .then(calculateScores)
    .catch(function (error) {console.warn('Error in getPlayersInfo:', error)})
  }
};

module.exports = helpers;
