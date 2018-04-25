import React from 'react';
import { blobType, modeType } from '../../../client/propTypes';

const getPreview = ({ content }, mode) => ({
  html: mode.convert(content).html,
  jsx: mode.renderJsxStyle,
  className: mode.previewClassName,
});


export default class Preview extends React.PureComponent {
  static propTypes = {
    blob: blobType.isRequired,
    mode: modeType.isRequired,
  }
  render() {
    const preview = getPreview(this.props.blob, this.props.mode);
    if (preview) {
      return (
        <div>
          <div
            className={preview.className}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: preview.html }}
          />
          {preview.jsx()}
        </div>
      );
    }
    return (<div>Preview not available</div>);
  }
}
