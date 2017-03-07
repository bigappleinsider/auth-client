import React, { Component } from 'react';

import { reduxForm, Field, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';

import * as actions from '../../actions';

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined;
const required = value => value ? undefined : 'Required';

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className={`form-group ${error&&touched?'has-danger':''}`}>
    <label>{label}</label>
      <input {...input} placeholder={label} type={type} className="form-control"/>
      {touched && ((error && <span className="text-help">{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);

class Signup extends Component {
  handleFormSubmit({ email, password, passwordConfirm }) {
    //console.log(this.props);
    if (password !== passwordConfirm) {
      throw new SubmissionError({ _error: 'Password must match!' })
    }
    this.props.signupUser({ email, password });
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Ooops</strong>{this.props.errorMessage}
        </div>
      );
    }
  }
  render() {
    const { handleSubmit, error } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

          <Field
            name="email"
            label="Email:"
            validate={[ required, email ]}
            component={renderField}
            type="text" />

          <Field name="password"
            label="Password:"
            validate={[ required ]}
            component={renderField}
            type="password" />

          <Field name="passwordConfirm"
            label="Password confirm:"
            validate={[ required ]}
            component={renderField}
            type="password"
            className="form-control" />
            {error &&
          <div className="form-group has-danger">
             <span className="text-help">{error}</span>
             </div>
           }
           {this.renderAlert()}
          <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}


function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

function validate(formProps) {
  const errors = {};
  if(formProps.password !== formProps.passwordConfirm){
    errors.password = 'Passwords do not match';
  }
  return errors;
}

Signup = reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm']
})(Signup);
//, null, actions)(Signin);
export default connect(mapStateToProps, actions)(Signup);
