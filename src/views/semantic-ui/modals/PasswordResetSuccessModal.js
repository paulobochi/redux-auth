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

    const {formatMessage} = this.props.intl;

    return (
      <Modal
        open={this.props.show}
        className="password-reset-success-modal"
        onClose={this.close.bind(this)}
        closeIcon='close'>
        <Modal.Header content={formatMessage({id: 'redux-auth.modal.password_reset_success.title', defaultMessage: "Reset Your Password"})}/>

        <Modal.Content>
          <Form>
            <Input
              type="password"
              label={formatMessage({id: 'redux-auth.password', defaultMessage: 'Password'})}
              placeholder={formatMessage({id: 'redux-auth.password', defaultMessage: 'Password'})}
              disabled={loading}
              groupClassName="password-reset-success-modal-password"
              value={this.props.auth.getIn(["updatePasswordModal", endpoint, "form", "password"])}
              errors={this.props.auth.getIn(["updatePasswordModal", endpoint, "errors", "password"])}
              onChange={this.handleInput.bind(this, "password")}
              {...this.props.inputProps.password} />

            <Input
              type="password"
              label={formatMessage({id: 'redux-auth.password_confirmation', defaultMessage: 'Password Confirmation'})}
              placeholder={formatMessage({id: 'redux-auth.password_confirmation', defaultMessage: 'Password Confirmation'})}
              disabled={loading}
              groupClassName="password-reset-success-modal-password-confirmation"
              value={this.props.auth.getIn(["updatePasswordModal", endpoint, "form", "password_confirmation"])}
              errors={this.props.auth.getIn(["updatePasswordModal", endpoint, "errors", "password_confirmation"])}
              onChange={this.handleInput.bind(this, "password_confirmation")}
              {...this.props.inputProps.passwordConfirmation} />
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button
              className="password-reset-success-modal-close"
              onClick={this.close.bind(this)}
              {...this.props.inputProps.cancel}>
              {formatMessage({id: 'redux-auth.button.cancel', defaultMessage: 'Cancel'})}
            </Button>

            <Button
              {...this.props}
              primary
              loading={loading}
              type="submit"
              onClick={this.handleSubmit.bind(this)}
              {...this.props.inputProps.submit}>
              {formatMessage({id: 'redux-auth.button.update_password', defaultMessage: 'Update Password'})}
            </Button>
          </Modal.Actions>
      </Modal>
    );
  }
}

export default injectIntl(connect(({auth}) => ({auth}))(PasswordResetSuccessModal));
