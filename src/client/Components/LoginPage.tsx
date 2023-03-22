import { useState } from 'react';
import { Link } from 'react-router-dom';

interface LoginFormState {
    username: string;
    password: string;
  }
  
  const initialLoginFormState: LoginFormState = {
    username: "",
    password: ""
  };


const LoginPage = () => {
    const [loginState, setLoginState] = useState<LoginFormState>(initialLoginFormState);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setLoginState(prevState => ({
        ...prevState,
        [name]: value
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
        body: JSON.stringify({username: loginState.username, password: loginState.password}),
      }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log('data', data);
      }).catch((error) => {
        console.log('err', error);
      })
      clearForm();
    };

    const clearForm = () => {
        setLoginState({
          username: '',
          password: ''
        });
      }
  
    return (
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
        <button className= "label1" type="submit">Login</button>
        <Link to='/signup'><button>Sign Up</button></Link>
        <Link to='/forgot'><button>Forgot My Password</button></Link>
      </form>
      </>
    );
  }

export default LoginPage;