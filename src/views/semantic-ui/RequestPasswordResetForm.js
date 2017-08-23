import React, { PropTypes } from "react";
import Input from "./Input";
import ButtonLoader from "./ButtonLoader";
import { Icon, Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { injectIntl } from 'react-intl';
import {
  requestPasswordResetFormUpdate,
  requestPasswordReset
} from "../../actions/request-password-reset";

class RequestPasswordResetForm extends React.Component {
  static propTypes = {
    endpoint: PropTypes.string,
    inputProps: PropTypes.shape({
      email: PropTypes.object,
      submit: PropTypes.object
    })
  };

  static defaultProps = {
    inputProps: {
      email: {},
      submit: {}
    }
  };

  getEndpoint () {
    return (
      this.props.endpoint ||
      this.props.auth.getIn(["configure", "currentEndpointKey"]) ||
      this.props.auth.getIn(["configure", "defaultEndpointKey"])
    );
  }

  handleInput (key, val) {
    this.props.dispatch(requestPasswordResetFormUpdate(this.getEndpoint(), key, val));
  }

  handleSubmit (event) {
    event.preventDefault();
    let formData = this.props.auth.getIn(["requestPasswordReset", this.getEndpoint(), "form"]).toJS();
    this.props.dispatch(requestPasswordReset(formData, this.getEndpoint()))
      .then(this.props.next)
      .catch(() => {});
  }

  render () {
    let loading = this.props.auth.getIn(["requestPasswordReset", this.getEndpoint(), "loading"]);
    let inputDisabled = this.props.auth.getIn(["user", "isSignedIn"]);
    let submitDisabled = !this.props.auth.getIn(["requestPasswordReset", this.getEndpoint(), "form", "email"]);

    const {formatMessage} = this.props.intl;

    return (
      <Form
        className='redux-auth request-password-reset-form clearfix'
        onSubmit={this.handleSubmit.bind(this)}>

        <Input
          type="text"
          label={formatMessage({id: 'redux-auth.email', defaultMessage: 'Email'})}
          groupClassName="request-password-reset-email"
          placeholder={formatMessage({id: 'redux-auth.email', defaultMessage: 'Email'})}
          disabled={loading || inputDisabled}
          value={this.props.auth.getIn(["requestPasswordReset", this.getEndpoint(), "form", "email"])}
          errors={this.props.auth.getIn(["requestPasswordReset", this.getEndpoint(), "errors", "email"])}
          onChange={this.handleInput.bind(this, "email")}
          {...this.props.inputProps.email} />

        <Button
          fluid
          primary
          loading={loading}
          type="submit"
          className='request-password-reset-submit'
          disabled={submitDisabled}
          onClick={this.handleSubmit.bind(this)}
          {...this.props.inputProps.submit}>
          {formatMessage({id: 'redux-auth.button.request_password_reset', defaultMessage: 'Request Password Reset'})}
        </Button>
      </Form>
    );
  }
}

export default injectIntl(connect(({auth}) => ({auth}))(RequestPasswordResetForm));
