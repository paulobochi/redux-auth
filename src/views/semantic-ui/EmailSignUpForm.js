import React, { PropTypes } from "react";
import Input from "./Input";
import { Form, Button } from "semantic-ui-react";
import { emailSignUpFormUpdate, emailSignUp } from "../../actions/email-sign-up";
import { connect } from "react-redux";
import { injectIntl } from 'react-intl';

class EmailSignUpForm extends React.Component {
  static propTypes = {
    endpoint: PropTypes.string,
    next: PropTypes.func,
    inputProps: PropTypes.shape({
      email: PropTypes.object,
      password: PropTypes.object,
      passwordConfirmation: PropTypes.object,
      submit: PropTypes.object
    })
  };

  static defaultProps = {
    next: () => {},
    inputProps: {
      email: {},
      password: {},
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
    this.props.dispatch(emailSignUpFormUpdate(this.getEndpoint(), key, val));
  }

  handleSubmit (event) {
    event.preventDefault();
    let formData = this.props.auth.getIn(["emailSignUp", this.getEndpoint(), "form"]).toJS();
    this.props.dispatch(emailSignUp(formData, this.getEndpoint()))
      .then(this.props.next)
      .catch(() => {});
  }

  render () {
    let disabled = (
      this.props.auth.getIn(["user", "isSignedIn"]) ||
      this.props.auth.getIn(["emailSignUp", this.getEndpoint(), "loading"])
    );

    const {formatMessage} = this.props.intl;

    return (
      <Form className='redux-auth email-sign-up-form clearfix'
            onSubmit={this.handleSubmit.bind(this)}>
        <Input type="text"
               label={formatMessage({id: 'redux-auth.name', defaultMessage: 'Name'})}
               placeholder={formatMessage({id: 'redux-auth.name', defaultMessage: 'Name'})}
               groupClassName="email-sign-up-name"
               disabled={disabled}
               value={this.props.auth.getIn(["emailSignUp", this.getEndpoint(), "form", "name"])}
               errors={this.props.auth.getIn(["emailSignUp", this.getEndpoint(), "errors", "name"])}
               onChange={this.handleInput.bind(this, "name")}
               {...this.props.inputProps.name} />

        <Input type="text"
               label={formatMessage({id: 'redux-auth.email', defaultMessage: 'Email'})}
               placeholder={formatMessage({id: 'redux-auth.email', defaultMessage: 'Email'})}
               groupClassName="email-sign-up-email"
               disabled={disabled}
               value={this.props.auth.getIn(["emailSignUp", this.getEndpoint(), "form", "email"])}
               errors={this.props.auth.getIn(["emailSignUp", this.getEndpoint(), "errors", "email"])}
               onChange={this.handleInput.bind(this, "email")}
               {...this.props.inputProps.email} />

        <Input type="password"
               label={formatMessage({id: 'redux-auth.password', defaultMessage: 'Password'})}
               placeholder={formatMessage({id: 'redux-auth.password', defaultMessage: 'Password'})}
               groupClassName="email-sign-up-password"
               disabled={disabled}
               value={this.props.auth.getIn(["emailSignUp", this.getEndpoint(), "form", "password"])}
               errors={this.props.auth.getIn(["emailSignUp", this.getEndpoint(), "errors", "password"])}
               onChange={this.handleInput.bind(this, "password")}
               {...this.props.inputProps.password} />

        <Input type="password"
               label={formatMessage({id: 'redux-auth.password_confirmation', defaultMessage: 'Password Confirmation'})}
               placeholder={formatMessage({id: 'redux-auth.password_confirmation', defaultMessage: 'Password Confirmation'})}
               groupClassName="email-sign-up-password-confirmation"
               disabled={disabled}
               value={this.props.auth.getIn(["emailSignUp", this.getEndpoint(), "form", "password_confirmation"])}
               errors={this.props.auth.getIn(["emailSignUp", this.getEndpoint(), "errors", "password_confirmation"])}
               onChange={this.handleInput.bind(this, "password_confirmation")}
               {...this.props.inputProps.passwordConfirmation} />

        <Button
          fluid
          primary
          loading={this.props.auth.getIn(["emailSignUp", this.getEndpoint(), "loading"])}
          type="submit"
          className='email-sign-up-submit pull-right'
          disabled={disabled}
          onClick={this.handleSubmit.bind(this)}
          {...this.props.inputProps.submit}>
          {formatMessage({id: 'redux-auth.button.signup', defaultMessage: 'Sign up'})}
        </Button>
      </Form>
    );
  }
}

export default injectIntl(connect(({auth}) => ({auth}))(EmailSignUpForm));
