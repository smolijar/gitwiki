import PropTypes from 'prop-types';

export default PropTypes.shape({
  avatar: PropTypes.string,
  name: PropTypes.string,
  username: PropTypes.string,
  githubPersonalAccessTokenSet: PropTypes.bool,
});
