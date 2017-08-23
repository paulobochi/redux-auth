import React from "react";
import { hideEmailSignInErrorModal } from "../../../actions/ui";
import { injectIntl } from 'react-intl';
import Modal from "./Modal";

class EmailSignInErrorModal extends React.Component {
  render () {
    const {formatMessage} = this.props.intl;

    return (
      <Modal
        show={this.props.show}
        containerClass="email-sign-in-error-modal"
        closeAction={hideEmailSignInErrorModal}
        title={formatMessage({id:'redux-auth.modal.email_sign_in_error.title', defaultMessage: 'Sign In Error'})}
        errorAddr={["emailSignIn", "errors"]} />
    );
  }
}

export default injectIntl(EmailSignInErrorModal);
