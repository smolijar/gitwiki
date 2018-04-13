import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { List } from 'antd';
import { compile } from 'path-to-regexp';
import { front } from '../../../common/endpoints';
import Highlight from 'react-highlight.js';

import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

export default class Blob extends React.PureComponent {
  static propTypes = {
    blob: PropTypes.shape({
      content: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    return (
      <div className="card-container">
        <Tabs type="card">
          <TabPane tab="Source code" key="1">
            <Highlight>{this.props.blob.content}</Highlight>
          </TabPane>
          <TabPane tab="Preview" key="2">
            TODO PREVIEW
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
