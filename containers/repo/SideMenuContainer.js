import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import SideMenu from '../../components/repo/SideMenu';


export default connect(
  state => ({ repo: state.repo }),
  { setChange: actions.revision.setChange, postRevision: actions.revision.postRevision },
)(SideMenu);
