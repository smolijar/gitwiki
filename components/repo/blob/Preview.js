import React from 'react';
import PropTypes from 'prop-types';

const getPreview = ({ content }, mode) => ({
  html: mode.convert(content).html,
  jsx: mode.renderJsxStyle,
  className: mode.previewClassName,
});


export default class Preview extends React.PureComponent {
  static propTypes = {
    blob: PropTypes.shape({
      content: PropTypes.string.isRequired,
    }).isRequired,
    mode: PropTypes.shape({
      convert: PropTypes.func,
      renderJsxStyle: PropTypes.func,
      previewClassName: PropTypes.string,
    }).isRequired,
  }
  render() {
    const preview = getPreview(this.props.blob, this.props.mode);
    if (preview) {
      return (
        <div>
          <div className={preview.className} dangerouslySetInnerHTML={{ __html: preview.html }} />
          {preview.jsx()}
        </div>
      );
    }
    return (<div>Preview not available</div>);
  }
}
