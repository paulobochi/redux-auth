import React from "react";
import { hideSignOutSuccessModal } from "../../../actions/ui";
import { injectIntl } from 'react-intl';
import Modal from "./Modal";

class SignOutSuccessModal extends React.Component {
  render () {
    const {formatMessage} = this.props.intl;

    return (
      <Modal
        show={this.props.show}
        containerClass="sign-out-success-modal"
        title={formatMessage({id: 'redux-auth.modal.sign_out_success.title', defaultMessage: "Goodbye!"})}
        closeAction={hideSignOutSuccessModal}>
        <p>
          {formatMessage(
            {
              id: 'redux-auth.modal.sign_out_success.content',
              defaultMessage: 'You have been successfully signed out.'
            }
          )}
        </p>
      </Modal>
    );
  }
}

export default injectIntl(SignOutSuccessModal);
