import React from 'react';
import { modes } from 'emily-editor';
import Highlight from 'react-highlight.js';
import { Tabs } from 'antd';
import Preview from './Preview';
import { blobType } from '../../../client/propTypes';

const { TabPane } = Tabs;


const getMode = (name) => {
  if (name.match(/\.(md|markdown)$/)) {
    return modes.markdown;
  }
  if (name.match(/\.(adoc|asc|asciidoc)$/)) {
    return modes.asciidoc;
  }
  return false;
};

export default class Blob extends React.PureComponent {
  static propTypes = {
    blob: blobType.isRequired,
  }

  render() {
    const mode = getMode(this.props.blob.name);
    return (
      <div className="card-container">
        <Tabs type="card">
          {
            mode &&
            <TabPane tab="Preview" key="1">
              <Preview blob={this.props.blob} mode={mode} />
            </TabPane>
          }
          <TabPane tab="Source code" key="2">
            <Highlight>{this.props.blob.content}</Highlight>
          </TabPane>
        </Tabs>
        <style jsx global>{`
        .card-container {
          margin-top: -63px;
          position: relative;
        }
        .card-container > .ant-tabs-card > .ant-tabs-content {
          margin-top: -8px;
        }
        .card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
          background: #fff;
          padding: 16px;
        }
        .card-container > .ant-tabs-card > .ant-tabs-bar {
          border-color: #fff;
          text-align: right;
        }
        .card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
          border-color: transparent;
          background: transparent;
        }
        .card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
          border-color: #fff;
          background: #fff;
        }
        .blob-actions {
          position: absolute;
          right: 0;
          top: 60px;
          z-index: 10;
          margin: 5px;
        }
        `}
        </style>
      </div>
    );
  }
}
