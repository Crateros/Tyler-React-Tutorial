var React = require('react');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');
var PlayerPreview = require('./PlayerPreview');

function Player(props) {
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
    </div>
  )
}

Player.PropTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
}

class Results extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true,
    }
  }

  //Pass players to API once the results component loads
  componentDidMount() {
    var players = queryString.parse(this.props.location.search);
    console.log("players: ", players);
    api.battle([
      players.playerOneName,
      players.playerTwoName
    ]).then(function(results) {
      console.log(results);
      //An error was thrown in utils / api
      if (results === null) {
        return this.setState(function() {
          return {
            error: 'An error occured in api. Check both users exist on GitHub.',
            loading: false,
          }
        });
      }

      //No error occured, update state with results from battle function in utils / api
      this.setState(function() {
        return {
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false
        }
      });
    }.bind(this));
  }

  render() {
    var error = this.state.error;
    var winner = this.state.winner;
    var loser = this.state.loser;
    var loading = this.state.loading;

    if (loading === true) {
      return <p>Loading...</p>
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }

    console.log(this.props);
    return (
      <div className="row">
        {/* {JSON.stringify(this.state, null, 2)} */}
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}
        />

        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    )
  }
}

module.exports = Results;
