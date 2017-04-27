var axios = require('axios');

var id = "2dadabf15dbc13767ebd";
var secret = "ff96cfdf12fbece5e79b07e916ee7704ff188c09";
var params = "?client_id=" + id + "&client_secret=" + secret;

function getProfile (username) {
  return axios.get('https://api.github.com/users/' + username + params)
    .then(function(user) {
      return user.data;
    });
}

function getRepos (username) {
  return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=50')
}

function getStarCount(repos) {
  return repos.data.reduce(function(count, repo)  {
      return count + repo.stargazers_count;
  }, 0);
}

function calculateScore(profile, repos) {
  var followers = profile.followers;
  var totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

function handleError (error) {
  console.warn(error);
  return null;
}

//This sums all the axios api calls into one return asynchronously
function getUserData (player) {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then(function(data) {
    var profile = data[0];
    var repos = data[1];

    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }

  })
}

function sortPlayers(players) {
  return players.sort(function(a,b) {
    return b.score-a.score;
  });
}

//Exports these methods as object items for use in other components
module.exports = {

  battle: function(players) {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
  },
  fetchPopularRepos: function (language) {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');

    return axios.get(encodedURI)
      .then(function (response) {
        return response.data.items;
    });
  }
}