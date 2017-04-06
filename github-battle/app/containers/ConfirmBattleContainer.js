var React = require('react');
var ConfirmBattle = require('../components/ConfirmBattle');

//Use contextTypes to pass routing ability from parent down to child

var ConfirmBattleContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return {
      isLoading: true,
      playerInfo: []
    }
  },
  //After mounting, need to fetch user entered info for playerOne name and
  // playerTwo name, use componentDidMount
  componentDidMount: function () {
    var query = this.props.location.query;
    console.log("Github usernames: ", query);
    //Fetch info from github API then update state!
  },
  render: function () {
    return (
      <ConfirmBattle
        isLoading={this.state.isLoading}
        playerInfo={this.state.playerInfo}/>
    );
  }
});

module.exports = ConfirmBattleContainer;
