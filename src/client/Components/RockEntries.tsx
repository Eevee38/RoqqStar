import { useState, useEffect } from 'react';
import RockEntry from './RockEntry';
import  { FormState } from '../../types'


const RockEntries = () => {
  const [entries, setEntries] = useState([])
  const [formState, setFormState] = useState<FormState>({
    name: '',
    image: '',
    description: '',
    location: '',
  });
      
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
      
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEntries([...entries, <RockEntry formState={formState} />]);
    clearForm();
  };

  const clearForm = () => {
    setFormState({
      name: '',
      image: '',
      description: '',
      location: '',
    });
  }
      
    return (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={formState.name} onChange={handleInputChange} />
            </label>
            <label>
              Image:
              <input type="text" name="image" value={formState.image} onChange={handleInputChange} />
            </label>
            <label>
              Description:
              <input type="text" name="description" value={formState.description} onChange={handleInputChange} />
            </label>
            <label>
              Location:
              <input type="text" name="location" value={formState.location} onChange={handleInputChange} />
            </label>
            <button type="submit">Submit</button>
          </form>
            {entries}

        </div>
    )
}

export default RockEntries;