import { useState } from 'react';
import { Link } from 'react-router-dom';

interface LoginFormState {
    username: string;
    newPassword: string;
  }
  
  const initialLoginFormState: LoginFormState = {
    username: "",
    newPassword: ""
  };


const ForgotPage = () => {
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
      clearForm();
    };

    const clearForm = () => {
        setLoginState({
          username: '',
          newPassword: ''
        });
      }
  
    return (
      <>
      <form id="forgotform" onSubmit={handleSubmit}>
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
          New Password:
          <input
            type="password"
            name="password"
            value={loginState.newPassword}
            onChange={handleInputChange}
          />
        </label>
        <button className= "label1" type="submit">Submit</button>
      </form>
      </>
    );
  }

export default ForgotPage;