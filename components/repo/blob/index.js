import React from 'react';
import PropTypes from 'prop-types';
import { modes } from 'emily-editor';
import Highlight from 'react-highlight.js';
import { Tabs } from 'antd';
import Preview from './Preview';


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
    blob: PropTypes.shape({
      content: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
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
        `}
        </style>
      </div>
    );
  }
}
