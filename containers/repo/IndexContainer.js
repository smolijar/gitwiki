import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import Index from '../../components/repo/Index';

export default connect(
  state => ({ index: state.repo.index }),
  { fetchIndex: actions.repo.fetchIndex },
)(Index);
