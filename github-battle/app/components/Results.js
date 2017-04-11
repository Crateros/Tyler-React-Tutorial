var React = require('react');
var PropTypes = React.PropTypes;
var styles = require('../styles');
var UserDetails = require('./UserDetails');
var UserDetailsWrapper = require('./UserDetailsWrapper');
var Link = require('react-router').Link;
var MainContainer = require('./MainContainer');

function puke (obj) {
  return <pre>{JSON.stringify(obj, 2, ' ')}</pre>
}

// function Results (props) {
//   return (
//     <div> Results: {puke(props)} </div>
//   )
// }

//Start over button
function StartOver () {
  return (
    <div className='col-sm-12' style={styles.space}>
      <Link to='/playerOne'>
        <button type='button' className='btn btn-lg btn-danger'>Start Over</button>
      </Link>
    </div>
  )
}

//Loading screen
function Results (props) {
  if(props.isLoading === true) {
    return (
      <p>LOADING</p>
    )
  }

  //Handle tie battle
  if (props.scores[0] === props.scores[1]) {
    return (
      <MainContainer>
        <h1>It's a tie!</h1>
        <StartOver />
      </MainContainer>
    )
  }

  var winIndex = props.scores[0] > props.scores[1] ? 0 : 1;
  var loseIndex = winIndex === 0 ? 1 : 0;
  return (
    <MainContainer>
      <h1>Results</h1>
      <div className="col-sm-8 col-sm-offset-2">
        <UserDetailsWrapper header="Winner">
          <UserDetails score={props.scores[winIndex]} info={props.playersInfo[winIndex]} />
        </UserDetailsWrapper>
        <UserDetailsWrapper header="Loser">
          <UserDetails score={props.scores[loseIndex]} info={props.playersInfo[loseIndex]} />
        </UserDetailsWrapper>
      </div>
      <StartOver />
    </MainContainer>
  )
}

Results.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  playersInfo: PropTypes.array.isRequired,
  scores: PropTypes.array.isRequired
}


module.exports = Results;
