import React from "react";
import { connect } from "react-redux";
import { hidePasswordResetRequestSuccessModal } from "../../../actions/ui";
import { injectIntl } from 'react-intl';
import Modal from "./Modal";

class RequestPasswordResetSuccessModal extends React.Component {
  render () {
    const {formatMessage} = this.props.intl;

    return (
      <Modal
        show={this.props.show}
        containerClass="request-password-reset-success-modal"
        title={formatMessage({id: 'redux-auth.modal.request_password_reset_success', defaultMessage: "Password Reset Request Success"})}
        closeAction={hidePasswordResetRequestSuccessModal}>
        <p>
          {this.props.auth.getIn(["ui", "requestPasswordResetSuccessMessage"])}
        </p>
      </Modal>
    );
  }
}

export default injectIntl(connect(({auth}) => ({auth}))(RequestPasswordResetSuccessModal));
