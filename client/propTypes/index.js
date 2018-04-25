import PropTypes from 'prop-types';

const blobType = PropTypes.shape({
  content: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});

const repoType = PropTypes.shape({
  meta: PropTypes.objectOf(PropTypes.string).isRequired,
  tree: PropTypes.arrayOf(PropTypes.object).isRequired,
});

const revisionType = PropTypes.shape({
  message: PropTypes.string.isRequired,
  changes: PropTypes.arrayOf(PropTypes.object).isRequired,
});

const modeType = PropTypes.shape({
  convert: PropTypes.func,
  renderJsxStyle: PropTypes.func,
  previewClassName: PropTypes.string,
});

const repoIndexEntryType = PropTypes.shape({
  name: PropTypes.string,
  description: PropTypes.string,
  provider: PropTypes.string,
});

const repoIndexType = PropTypes.arrayOf(repoIndexEntryType);

const userType = PropTypes.shape({
  avatar: PropTypes.string,
  name: PropTypes.string,
  username: PropTypes.string,
  githubPersonalAccessTokenSet: PropTypes.bool,
});

const accessTokenType = PropTypes.string;

const refsType = PropTypes.arrayOf(PropTypes.object);

export {
  blobType,
  modeType,
  repoType,
  revisionType,
  repoIndexEntryType,
  repoIndexType,
  userType,
  refsType,
  accessTokenType,
};
