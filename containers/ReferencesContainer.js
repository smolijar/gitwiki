import { connect } from 'react-redux';
import actions from '../redux/actions/actions';
import References from '../components/References';


export default connect(
  state => ({ repo: state.repo.meta, refs: state.repo.refs }),
  { fetchRefs: actions.repo.fetchRefs, fetchList: actions.repo.fetchList },
)(References);
