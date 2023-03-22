import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RockEntries from './RockEntries';

interface LoginFormState {
  username: string;
  password: string;
}

const initialLoginFormState: LoginFormState = {
  username: '',
  password: '',
};

const LoginPage = () => {
  const [loginState, setLoginState] = useState<LoginFormState>(
    initialLoginFormState
  );
  const [auth, setAuth] = useState(false);

  // on component mount, fetch to auth route to check token
  // if token is true/positive response from server, set auth to true
  useEffect(() => {
    fetch('http://localhost:8080/auth')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('data', data);
        if (data.login) {
          setAuth(true);
        }
      })
      .catch((err) => {
        console.log('error in use effect login page ', err);
      });
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // perform login logic here using formState.username and formState.password
    setLoginState(initialLoginFormState);
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: loginState.username,
        password: loginState.password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('data', data);
        if (data.token) {
          // update state with auth: true
          setAuth(true);
        }
      })
      .catch((error) => {
        console.log('err', error);
      });
    clearForm();
  };

  const clearForm = () => {
    setLoginState({
      username: '',
      password: '',
    });
  };

  return auth ? (
    <RockEntries />
  ) : (
    <>
      <form id="loginform" onSubmit={handleSubmit}>
        <label className="label1">
          Username:
          <input
            type="text"
            name="username"
            value={loginState.username}
            onChange={handleInputChange}
          />
        </label>
        <label className="label1">
          Password:
          <input
            type="password"
            name="password"
            value={loginState.password}
            onChange={handleInputChange}
          />
        </label>
        <button className="button" type="submit">
          Login
        </button>
        <Link to="/signup">
          <button className="button">Sign Up</button>
        </Link>
        <Link to="/forgot">
          <button className="buttonForgot">Forgot My Password</button>
        </Link>
      </form>
    </>
  );
};

export default LoginPage;
