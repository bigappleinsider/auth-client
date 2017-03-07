import React, { Component } from 'react';

import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    //console.log(this.props);
    this.props.signinUser({ email, password });
  }
  renderAllert(){
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops, </strong>{this.props.errorMessage}
        </div>
      );
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field name="email" component="input" type="text" className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field name="password" component="input" type="password" className="form-control" />
        </fieldset>
        {this.renderAllert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

/*
function mapStateToProps(state) {
    return { form: state.form };
}


Signin = connect(mapStateToProps, actions)(Signin);
Signin = reduxForm({
 form: 'signin'
})(Signin);
export default Signin;
*/

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

Signin = reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(Signin);
//, null, actions)(Signin);
export default connect(mapStateToProps, actions)(Signin);
