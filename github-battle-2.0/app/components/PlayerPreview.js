var React = require('react');

//Stateless functional component
function PlayerPreview(props) {
  console.log("Player Preview props: ", props);
  return (
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={props.avatar}
          alt={'Avatar for ' + props.username} />
        <h2 className='username'>@{props.username}</h2>
      </div>
      <button
        className='reset'
        // Needs the id of which player is requesting reset
        onClick={props.onReset.bind(null, props.id)}>
          Reset
      </button>
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

module.exports = PlayerPreview;
