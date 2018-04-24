import { connect } from 'react-redux';
import actions from '../../../redux/actions/actions';
import Modal from '../../../components/repo/revision/Modal';


export default connect(
  state => ({ repo: state.repo }),
  { postRevision: actions.revision.postRevision },
)(Modal);
