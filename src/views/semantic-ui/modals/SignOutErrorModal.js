import React from "react";
import { hideSignOutErrorModal } from "../../../actions/ui";
import { injectIntl } from 'react-intl';
import Modal from "./Modal";

class SignOutErrorModal extends React.Component {
  render () {
    const {formatMessage} = this.props.intl;

    return (
      <Modal
        show={this.props.show}
        containerClass="sign-out-error-modal"
        closeAction={hideSignOutErrorModal}
        title={formatMessage({id: 'redux-auth.modal.sign_out_error.title', defaultMessage: "Sign Out Error"})}>
        <p>
          {formatMessage(
            {
              id: 'redux-auth.modal.sign_out_error.content',
              defaultMessage: 'The server encountered an error while trying to sign you out. Your account information has been wiped from this browser, but you may want to sign in and then sign back out again to resolve any issues.'
            }
          )}
        </p>
      </Modal>
    );
  }
}

export default injectIntl(SignOutErrorModal);
