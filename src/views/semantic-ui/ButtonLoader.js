import React, { PropTypes } from "react";
import { Button } from 'semantic-ui-react'
import Spinner from "react-loader";

class ButtonLoader extends React.Component {
  static propTypes = {
    icon: PropTypes.any,
    loading: PropTypes.bool,
    spinConfig: PropTypes.object,
    spinColorDark: PropTypes.string,
    spinColorLight: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func.isRequired,
    style: PropTypes.object
  };

  static defaultProps = {
    loading: false,
    spinConfig: {
      lines: 10,
      length: 4,
      width: 2,
      radius: 3
    },
    spinColorDark: "#444",
    spinColorLight: "#fff",
    children: <span>Submit</span>,
    style: {}
  };

  render () {
    return (
      <Button
        loading={this.props.loading}
        onClick={this.props.onClick}
        disabled={this.props.disabled || this.props.loading}
        bsStyle={this.props.bsStyle}
        className={this.props.className}
        type={this.props.type}
        style={this.props.style}
        bsSize={this.props.bsSize}>
        {this.props.children}
      </Button>
    );
  }
}

export default ButtonLoader;
