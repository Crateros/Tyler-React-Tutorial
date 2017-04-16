var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

//Stateless functional component, pass in props as argument, no state, receives everything as props
function SelectLanguage(props) {

  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className="languages">
      {languages.map(function(language) {
        // console.log("This", this);
        return (
          <li
            style={language === props.selectedLanguage ? { color: '#d0021b'} : null}
            onClick={props.onSelect.bind(null, language)}
            key={language}>
            {language}
          </li>
        )
      })}
    </ul>
  )
}

//Can turn this into a stateless function (above), make sure to pass in props as argument
// class SelectLanguage extends React.Component {
//   render() {
//     return (
//       <ul className="languages">
//         {languages.map(function(language) {
//           // console.log("This", this);
//           return (
//             <li
//               style={language === this.props.selectedLanguage ? { color: '#d0021b'} : null}
//               onClick={this.props.onSelect.bind(null, language)}
//               key={language}>
//               {language}
//             </li>
//           )
//         })}
//       </ul>
//     )
//   }
// }

function RepoGrid(props) {
  return (
    <ul className='popular-list'>
      {props.repos.map(function(repo, index) {
        return (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'Avatar for' + repo.owner.login} />
              </li>
              <li>
                <a target="_blank" href={repo.html_url}>{repo.name}</a>
              </li>
              <li>
                @{repo.owner.login}
              </li>
              <li>
                {repo.stargazers_count} stars
              </li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

class Popular extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  //check for componentDidMount before executing API call
  componentDidMount() {
    //AJAX in here. updateLanguage function invokes API call function
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(language) {
    this.setState(function () {
        return {
          selectedLanguage: language,
          repos: null
        }
    });
    //Fetch repo info on updateLanguage click
    api.fetchPopularRepos(language)
      .then(function(repos) {
        console.log(repos);
        this.setState(function() {
        return {
          repos: repos,
        }
        })
      }.bind(this));
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}/>
          {/* {JSON.stringify(this.state.repos, null, 2)} */}
          {/* Wait for repos to get returned from api before attempting to render RepoGrid */}
          {!this.state.repos
            ? <p>LOADING...</p>
            : <RepoGrid repos={this.state.repos} />}
      </div>
    )
  }
}

module.exports = Popular;
