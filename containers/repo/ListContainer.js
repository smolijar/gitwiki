import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import List from '../../components/repo/List';

export default connect(
  state => ({ index: state.repo.index }),
  { fetchIndex: actions.repo.fetchIndex },
)(List);
