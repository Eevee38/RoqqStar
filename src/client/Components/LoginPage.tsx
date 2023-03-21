import { useState } from 'react';
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
      clearForm();
    };

    const clearForm = () => {
        setLoginState({
          username: '',
          password: ''
        });
      }
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={loginState.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={loginState.password}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    );
  }

export default LoginPage;