import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormMessage from './FormMessage';
import PropTypes from 'prop-types';

const initialData = {
  email: '',
  password: '',
};

const LoginForm = ({ submit }) => {
  const [data, setData] = useState(initialData);
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
    if (!data.email) validationErrors.email = 'Email cannot be blank';
    if (!data.password) validationErrors.password = 'Password cannot be blank';
    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateErrors = validate(data);

    setErrors(validateErrors);

    if (Object.keys(validateErrors).length === 0) {
      setLoading(true);
      submit(data).catch((error) => {
        setErrors(error.response.data.errors);
        setLoading(false);
      });
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
          value={data.value}
          onChange={handleChange}
        />
        <FormMessage>{errors.password}</FormMessage>
      </div>

      <div className="ui fluid buttons">
        <button className="ui button primary">Login</button>
        <div className="or" />
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </div>
    </form>
  );
};
LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default LoginForm;
