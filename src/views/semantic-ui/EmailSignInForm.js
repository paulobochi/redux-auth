import React, {PropTypes} from "react";
import Input from "./Input";
import { Form, Modal, Button } from "semantic-ui-react";
import { emailSignInFormUpdate, emailSignIn } from "../../actions/email-sign-in";
import { connect } from "react-redux";
import { injectIntl } from 'react-intl';

class EmailSignInForm extends React.Component {
  static propTypes = {
    endpoint: PropTypes.string,
    next: PropTypes.func,
    inputProps: PropTypes.shape({
      email: PropTypes.object,
      password: PropTypes.object,
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
    this.props.dispatch(emailSignInFormUpdate(this.getEndpoint(), key, val));
  }

  handleSubmit (event) {
    event.preventDefault();
    let formData = this.props.auth.getIn(["emailSignIn", this.getEndpoint(), "form"]).toJS();
    this.props.dispatch(emailSignIn(formData, this.getEndpoint()))
      .then(this.props.next)
      .catch(() => {});
  }

  render () {
    let disabled = (
      this.props.auth.getIn(["user", "isSignedIn"]) ||
      this.props.auth.getIn(["emailSignIn", this.getEndpoint(), "loading"])
    );
    const {formatMessage} = this.props.intl;

    return (
      <Form className='redux-auth email-sign-in-form clearfix'
            onSubmit={this.handleSubmit.bind(this)}>
        <Input type="text"
               groupClassName="email-sign-in-email"
               label={formatMessage({id: 'redux-auth.email', defaultMessage: 'Email'})}
               placeholder={formatMessage({id: 'redux-auth.email', defaultMessage: 'Email'})}
               disabled={disabled}
               value={this.props.auth.getIn(["emailSignIn", this.getEndpoint(), "form", "email"])}
               errors={this.props.auth.getIn(["emailSignIn", this.getEndpoint(), "errors", "email"])}
               onChange={this.handleInput.bind(this, "email")}
               {...this.props.inputProps.email} />

        <Input type="password"
               label={formatMessage({id: 'redux-auth.password', defaultMessage: 'Password'})}
               groupClassName="email-sign-in-password"
               placeholder={formatMessage({id: 'redux-auth.password', defaultMessage: 'Password'})}
               disabled={disabled}
               value={this.props.auth.getIn(["emailSignIn", this.getEndpoint(), "form", "password"])}
               errors={this.props.auth.getIn(["emailSignIn", this.getEndpoint(), "errors", "password"])}
               onChange={this.handleInput.bind(this, "password")}
               {...this.props.inputProps.password} />

        <Button
          fluid
          primary
          loading={this.props.auth.getIn(["emailSignIn", this.getEndpoint(), "loading"])}
          type="submit"
          className='email-sign-in-submit pull-right'
          disabled={disabled}
          onClick={this.handleSubmit.bind(this)}
          {...this.props.inputProps.submit}>
          {formatMessage({id: 'redux-auth.button.signin', defaultMessage: 'Sign In'})}
        </Button>
      </Form>
    );
  }
}

export default injectIntl(connect(({auth}) => ({auth}))(EmailSignInForm));
