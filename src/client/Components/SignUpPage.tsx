import { useState } from 'react';
import { Link } from 'react-router-dom';

interface LoginFormState {
    username: string;
    password: string;
    email: string;
  }
  
  const initialLoginFormState: LoginFormState = {
    username: "",
    password: "",
    email: "",
  };


const SignUpPage = () => {
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
      // send data to be put into database
      setLoginState(initialLoginFormState);
      clearForm();
    };

    const clearForm = () => {
        setLoginState({
          username: '',
          password: '',
          email: '',
        });
      }
  
    return (
      <>
      <form id="signupform" onSubmit={handleSubmit}>
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
        <label className="label1">
          Email:
          <input
            type="text"
            name="email"
            value={loginState.email}
            onChange={handleInputChange}
          />
        </label>
        <button className= "label1" type="submit">Submit</button>
      </form>
      </>
    );
  }

export default SignUpPage;