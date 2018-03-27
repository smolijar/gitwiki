import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import List from '../../components/repo/List';

export default connect(
  state => ({ list: state.repo.list }),
  { fetchList: actions.repo.fetchList },
)(List);
