var React = require('react');
var ConfirmBattle = require('../components/ConfirmBattle');
var GithubHelper = require('../utils/GithubHelper');

//Use contextTypes to pass routing ability from parent down to child

var ConfirmBattleContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    console.log('get Initial State');
    return {
      isLoading: true,
      playerInfo: []
    }
  },

  componentWillMount: function () {
    console.log('component Will Mount');
  },

  //After mounting, need to fetch user entered info for playerOne name and
  // playerTwo name, use componentDidMount, this executes after render
  // method
  componentDidMount: function () {
    var query = this.props.location.query;
    console.log("Github usernames: ", query);
    console.log("component Did Mount")
    //Fetch info from github API then update state!
    GithubHelper.getPlayersInfo([query.playerOne, query.playerTwo])
    //Getting promise returned from GithubHelper
    .then(function (players) {
      console.log('PLAYERS', players);
      //The 'this' below is in a different function from 'this' above, need to
      // use .bind to assign state!
      this.setState({
        isLoading: false,
        playersInfo: [players[0], players[1]]
      })
      //Capture state of 'this' from above and pass it in
    }.bind(this))
  },

  handleInitiateBattle: function() {
    this.context.router.push({
      pathname: '/results',
      //This allows pushing state of playersInfo (array) to the new route
      // for rendering
      state: {
        playerInfo: this.state.playersInfo
      }
    })
  },

  //This runs when component receives new props
  componentWillReceiveProps: function () {
    console.log('component Will Receive Props');
  },

  //Runs when switching route / component
  componentWillUnmount: function () {
    console.log('component Will Unmount');
  },

  render: function () {
    return (
      <ConfirmBattle
        isLoading={this.state.isLoading}
        playersInfo={this.state.playersInfo}
        onInitiateBattle={this.handleInitiateBattle}/>
    );
  }
});

module.exports = ConfirmBattleContainer;
