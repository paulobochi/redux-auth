import React, { PropTypes } from "react";
import { Modal, Button, Icon, Form } from "semantic-ui-react";
import ButtonLoader from "../ButtonLoader";
import Input from "../Input";
import { connect } from "react-redux";
import { hidePasswordResetSuccessModal } from "../../../actions/ui";
import { injectIntl } from 'react-intl';
import {
  updatePasswordModal,
  updatePasswordModalFormUpdate
} from "../../../actions/update-password-modal";

class PasswordResetSuccessModal extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    inputProps: PropTypes.object
  };

  static defaultProps = {
    show: false,
    inputProps: {}
  };

  getEndpoint () {
    return (
      this.props.endpoint ||
      this.props.auth.getIn(["configure", "currentEndpointKey"]) ||
      this.props.auth.getIn(["configure", "defaultEndpointKey"])
    );
  }

  handleInput (key, val) {
    this.props.dispatch(updatePasswordModalFormUpdate(this.getEndpoint(), key, val));
  }

  handleSubmit () {
    let formData = this.props.auth.getIn(["updatePasswordModal", this.getEndpoint(), "form"]).toJS();
    this.props.dispatch(updatePasswordModal(formData, this.getEndpoint()));
  }

  close () {
    this.props.dispatch(hidePasswordResetSuccessModal(this.getEndpoint()));
  }

  render () {
    let loading = this.props.auth.getIn(["updatePasswordModal", this.getEndpoint(), "loading"]),
        endpoint = this.getEndpoint();

    return (
      <Modal
        open={this.props.show}
        className="password-reset-success-modal"
        onHide={this.close.bind(this)}
        closeIcon="close">
        <Modal.Header content="Reset Your Password"/>

        <Form>
          <Modal.Content>
            <Input
              type="password"
              label="Password"
              placeholder="Password"
              disabled={loading}
              groupClassName="password-reset-success-modal-password"
              value={this.props.auth.getIn(["updatePasswordModal", endpoint, "form", "password"])}
              errors={this.props.auth.getIn(["updatePasswordModal", endpoint, "errors", "password"])}
              onChange={this.handleInput.bind(this, "password")}
              {...this.props.inputProps.password} />

            <Input
              type="password"
              label="Password Confirmation"
              placeholder="Password Confirmation"
              disabled={loading}
              groupClassName="password-reset-success-modal-password-confirmation"
              value={this.props.auth.getIn(["updatePasswordModal", endpoint, "form", "password_confirmation"])}
              errors={this.props.auth.getIn(["updatePasswordModal", endpoint, "errors", "password_confirmation"])}
              onChange={this.handleInput.bind(this, "password_confirmation")}
              {...this.props.inputProps.passwordConfirmation} />
          </Modal.Content>

          <Modal.Actions>
            <Button
              className="password-reset-success-modal-close"
              onClick={this.close.bind(this)}
              {...this.props.inputProps.cancel}>
              Cancel
            </Button>

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
            
            <ButtonLoader
              {...this.props}
              loading={loading}
              type="submit"
              className="password-reset-success-modal-submit"
              icon={<Icon name="lock" />}
              onClick={this.handleSubmit.bind(this)}
              {...this.props.inputProps.submit} />
          </Modal.Actions>
        </form>
      </Modal>
    );
  }
}

export default injectIntl(connect(({auth}) => ({auth}))(PasswordResetSuccessModal));
