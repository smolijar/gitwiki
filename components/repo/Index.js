import React from 'react';
import { Row, Col } from 'antd';
import { splitEvery } from 'ramda';
import IndexEntry from './IndexEntry';
import PersonalTokenContainer from '../../containers/user/PersonalTokenContainer';
import { repoIndexType } from '../../client/propTypes';


export default class Index extends React.PureComponent {
  static propTypes = {
    index: repoIndexType.isRequired,
  }

  render() {
    return (
      <div>
        {splitEvery(3, this.props.index)
          .map(tuple => (
            <Row gutter={16} style={{ marginBottom: 16 }}>
              {
                tuple.map(item => (
                  <Col span={8} key={item.name}>
                    <IndexEntry entry={item} />
                  </Col>
                ))
              }
            </Row>
          ))}
        <PersonalTokenContainer />
      </div>
    );
  }
}
