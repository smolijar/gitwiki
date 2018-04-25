import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Badge, Modal, Input } from 'antd';
import { values } from 'ramda';

const { TextArea } = Input;


export default class CommitModal extends React.Component {
  static propTypes = {
    postRevision: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    revision: PropTypes.object.isRequired,
    repo: PropTypes.object.isRequired,
  }

  constructor() {
    super();
    this.messageArea = React.createRef();
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      show: false,
    };
  }
  getMessage = () => this.messageArea.current.textAreaRef.value;
  showModal = () => this.setState({ visible: true });
  handleOk = () => {
    this.props.setMessage(this.getMessage());
    this.props.postRevision(this.props.repo);
    this.setState({ visible: false });
  }
  handleCancel = () => this.setState({ visible: false });

  render() {
    const changes = values(this.props.repo.revision.changes).length;

    return (
      <div>
        <a onClick={this.showModal}>
          <Icon type="plus-circle-o" />Revision <Badge status={changes === 0 ? 'success' : 'warning'} />
        </a>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <pre>{JSON.stringify(this.props.repo.revision.changes)}</pre>
          <TextArea ref={this.messageArea} placeholder="Commit message" autosize />
        </Modal>
      </div>
    );
  }
}
