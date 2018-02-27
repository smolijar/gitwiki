import { connect } from 'react-redux';
import withRedux from '../redux/withRedux';
import actions from '../redux/actions/actions';
import References from '../components/References';


export default withRedux()(connect(
  state => ({ repo: state.repo.meta, refs: state.repo.refs }),
  { fetchRefs: actions.repo.fetchRefs },
)(References));
