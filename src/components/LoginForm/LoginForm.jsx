import React, { useRef, useState } from 'react';
import { useAuthServiceContext } from 'contexts/ServiceContext';
import { useModalHandlersContext } from 'contexts/ModalHandlersContext';
import { validate } from 'common/validate';
import Button from 'components/Button/Button';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  /* states */
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();
  const authService = useAuthServiceContext();
  const closeModal = useModalHandlersContext().closeModal;

  /* event handlers */
  const onSubmit = e => {
    e.preventDefault();
    errorMessage && setErrorMessage('');

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const isEmailValid = validate('email', email);
    setIsEmailValid(isEmailValid);
    const isPasswordValid = validate('password', password);
    setIsPasswordValid(isPasswordValid);
    if (!(isEmailValid && isPasswordValid)) return;

    authService
      .login(email, password)
      .then(() => closeModal())
      .catch(e => setErrorMessage(e.message));
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="email">Email</label>
      <input
        ref={emailRef}
        id="email"
        name="email"
        defaultValue=""
        placeholder="example@intojazz.com"
        autoComplete="email"
      />
      {!isEmailValid && <p>Enter a valid email address.</p>}

      <label htmlFor="password">Password</label>
      <input
        ref={passwordRef}
        type="password"
        id="password"
        name="password"
        defaultValue=""
        placeholder="********"
        autoComplete="current-password"
      />
      {!isPasswordValid && (
        <p>
          Use more than 8 letters containing digits, upper/lowercase characters
          and special characters.
        </p>
      )}

      {errorMessage && <p>{errorMessage}</p>}

      <Button content="Log in"></Button>

      <Link to="/signup">New to IntoJazz?</Link>
    </form>
  );
};

export default LoginForm;
