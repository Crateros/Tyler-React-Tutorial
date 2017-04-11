var React = require('react');
var GithubHelper = require('../utils/GithubHelper');
var Results = require('../components/Results');


// Getting player info from the router.push method from ConfirmBattleContainer
// via this.state.playersInfo

var ResultsContainer = React.createClass({
  getInitialState: function () {
    return {
      isLoading: true,
      scores: []
    }
  },
  componentDidMount: function () {
    console.log(this.props.location.state.playersInfo);
    GithubHelper.battle(this.props.location.state.playersInfo)
    .then(function (scores) {
      this.setState({
        scores: scores,
        isLoading: false
      })
    }.bind(this))
  },
  render: function() {
    return (
      <Results
        isLoading={this.state.isLoading}
        playersInfo={this.props.location.state.playersInfo}
        scores={this.state.scores}
        />
    );
  }
});

module.exports = ResultsContainer;
