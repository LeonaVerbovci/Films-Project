import React, { useState } from 'react';
import FormMessage from './FormMessage';
import isEmail from 'validator/lib/isEmail';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const intialData = {
  email: '',
  password: '',
  passwordConfirmation: '',
};

const SignUpForm = ({ submit }) => {
  const [data, setData] = useState(intialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validate = (data) => {
    const validationErrors = {};

    if (!isEmail(data.email)) {
      validationErrors.email = 'Email format is wrong';
    }

    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(data);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      submit(data).catch((error) => setErrors(error.response.data.errors), setLoading(false));
    }
  };

  const cls = loading ? 'ui form loading' : 'ui form';

  return (
    <form className={cls} onSubmit={handleSubmit}>
      <div className={errors.email ? 'error field' : 'field'}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />
        <FormMessage>{errors.email}</FormMessage>
      </div>

      <div className={errors.password ? 'error field' : 'field'}>
        <label>Password</label>
        <input
          type="text"
          name="password"
          id="password"
          placeholder="password"
          value={data.password}
          onChange={handleChange}
        />
        <FormMessage>{errors.password}</FormMessage>
      </div>

      <div className={errors.passwordConfirmation ? 'error field' : 'field'}>
        <label>Password Confirmation</label>
        <input
          type="text"
          name="passwordConfirmation"
          id="passwordConfirmation"
          placeholder="password confirmation"
          value={data.passwordConfirmation}
          onChange={handleChange}
        />
        <FormMessage>{errors.passwordConfirmation}</FormMessage>
      </div>

      <div className="ui fluid buttons">
        <button className="ui button primary">Sing Up</button>

        <div className="or" />

        <Link to="/" className="ui button">
          Cancel
        </Link>
      </div>
    </form>
  );
};

SignUpForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default SignUpForm;
