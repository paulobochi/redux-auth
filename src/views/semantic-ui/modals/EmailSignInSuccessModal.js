import React from "react";
import { connect } from "react-redux";
import { hideEmailSignInSuccessModal } from "../../../actions/ui";
import { injectIntl } from 'react-intl';
import Modal from "./Modal";

class EmailSignInSuccessModal extends React.Component {
  render () {
    const {formatMessage} = this.props.intl;

    return (
      <Modal
        show={this.props.show}
        containerClass="email-sign-in-success-modal"
        closeAction={hideEmailSignInSuccessModal}
        closeBtnLabel={formatMessage({id: 'redux-auth.button.close', defaultMessage: 'Close'})}
        title={formatMessage({id: 'redux-auth.modal.email_sign_in_success.title', defaultMessage: "Welcome Back"})}>
        <p>{formatMessage({id: 'redux-auth.modal.email_sign_in_success.content', defaultMessage: 'You are now signed in as'})} {this.props.auth.getIn(["user", "attributes", "email"])}.</p>
      </Modal>
    );
  }
}

export default injectIntl(connect(({auth}) => ({auth}))(EmailSignInSuccessModal));
