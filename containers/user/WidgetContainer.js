import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import Widget from '../../components/user/Widget';

export default connect(
  state => ({ user: state.user }),
  { fetchUser: actions.user.fetchUser },
)(Widget);
