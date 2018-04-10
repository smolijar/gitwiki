import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import PersonalToken from '../../components/user/PersonalToken';

export default connect(
  state => ({ user: state.user }),
  { fetchUser: actions.user.fetchUser, postToken: actions.user.postGithubPersonalToken },
)(PersonalToken);
