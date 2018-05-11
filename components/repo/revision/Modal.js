import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Input } from 'antd';
import { repoType, revisionType } from '../../../client/propTypes';

const { TextArea } = Input;


export default class CommitModal extends React.Component {
  static propTypes = {
    postRevision: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    revision: revisionType.isRequired,
    repo: repoType.isRequired,
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
    return (
      <div>
        <Button className="commit-btn" onClick={this.showModal} type="primary">Commit</Button>
        <Modal
          title="Commit"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <TextArea ref={this.messageArea} placeholder="Commit message" autosize />
        </Modal>
        <style jsx global>{`
          .commit-btn {
            margin: 15px 45px;
          }
        `}
        </style>
      </div>
    );
  }
}
