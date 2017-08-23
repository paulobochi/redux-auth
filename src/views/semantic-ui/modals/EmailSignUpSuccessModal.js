import React from "react";
import { hideEmailSignUpSuccessModal } from "../../../actions/ui";
import { connect } from "react-redux";
import { injectIntl } from 'react-intl';
import Modal from "./Modal";

class EmailSignUpSuccessModal extends React.Component {
  render () {
    const {formatMessage} = this.props.intl;

    return (
      <Modal
        containerClass="email-sign-up-success-modal"
        show={this.props.show}
        closeAction={hideEmailSignUpSuccessModal}
        title={formatMessage({id: 'redux-auth.modal.email_sign_up_success.title', defaultMessage: 'Sign Up Success'})}>
        <p>
          {formatMessage({
            id: 'redux-auth.modal.email_sign_up_success.content',
            defaultMessage: `A confirmation email was sent to your account at ${this.props.auth.getIn(["ui", "emailSignUpAddress"])}. Follow the instructions in the email to complete registration.`
          }, {email: this.props.auth.getIn(["ui", "emailSignUpAddress"])})}
        </p>
      </Modal>
    );
  }
}

export default injectIntl(connect(({auth}) => ({auth}))(EmailSignUpSuccessModal));
