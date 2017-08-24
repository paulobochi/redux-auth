import React from "react";
import { hidePasswordResetRequestErrorModal } from "../../../actions/ui";
import { injectIntl } from 'react-intl';
import Modal from "./Modal";

class RequestPasswordResetErrorModal extends React.Component {
  render () {
    const {formatMessage} = this.props.intl;

    return (
      <Modal
        show={this.props.show}
        containerClass="request-password-reset-error-modal"
        closeAction={hidePasswordResetRequestErrorModal}
        title={formatMessage({id: 'redux-auth.modal.request_password_reset_error.title', defaultMessage: 'Error'})}
        errorAddr={["requestPasswordReset", "errors"]} />
    );
  }
}

export default injectIntl(RequestPasswordResetErrorModal);
