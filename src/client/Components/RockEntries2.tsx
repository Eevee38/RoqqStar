import { useState, useEffect } from 'react';
import RockEntry from './RockEntry';
import  { FormState } from '../../types';
import React from 'react';

// when component mounts, query the database and render x amount of rocks
  // this updates the entry array in state, entries is an array of RockEntry components
// handle submit will make a new rock in database
  //asynchronously chain  setEntries functionality with response retrieval
  //from post request from handle submit WHEN making new rock

const RockEntries = () => {
  const [entries, setEntries] = useState([]);
  const [baseEntries, setBaseEntries] = useState({});
  let [id, setId] = useState(0);
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

  useEffect(() => {
    // code to run when component mounts (similar to componentDidMount)
    const obj = { rock1: {name: 'rock', image: 'image', description: 'a rock', location: 'here'}};
    setBaseEntries({...baseEntries, obj});
  }, []);
      
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEntries([...entries, <RockEntry key={id} 
        id={id} 
        editEntry={editEntry} 
        deleteEntry={deleteEntry} 
        entries={entries} 
        formState={formState}
        setFormState={setFormState} />]);
    setId(id += 1); 
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

  const deleteEntry = (id: number): void=> {
      const url = `http://localhost:8080/rock/delete`;
    //   fetch(url, {
    //     method: 'DELETE',
    //   })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     // Filter out the deleted entry from the entries array
    //     const updatedEntries = entries.filter(entry => entry.id !== id);
    //     // Update the state with the new entries array
    //     setEntries(updatedEntries);
    //     console.log('Entry deleted successfully!');
    //   })
    //   .catch(error => {
    //     console.error('Error deleting entry:', error);
    //   });
    // }
  };

  


const editEntry = (arg: number):void => {

    console.log('entries in edit', arg)
  
}

  // useEffect(() => {
  // }, [entries]);
      
    return (
        <div id="rockentries">

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
          </div>       
          <div>
            {entries}
          </div>
        </div>
    )
}

export default RockEntries;