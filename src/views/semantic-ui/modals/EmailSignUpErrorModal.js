import React from "react";
import { hideEmailSignUpErrorModal } from "../../../actions/ui";
import { injectIntl } from 'react-intl';
import Modal from "./Modal";

class EmailSignUpErrorModal extends React.Component {
  render () {
    const {formatMessage} = this.props.intl;

    return (
      <Modal
        show={this.props.show}
        containerClass="email-sign-up-error-modal"
        title={formatMessage({id: 'redux-auth.modal.email_sign_up_error.title', defaultMessage: "Sign Up Error"})}
        errorAddr={["emailSignUp", "errors", "full_messages"]}
        closeAction={hideEmailSignUpErrorModal} />
    );
  }
}

export default injectIntl(EmailSignUpErrorModal);
