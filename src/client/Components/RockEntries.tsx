import { useState, useEffect } from 'react';
import RockEntry from './RockEntry';
import  { FormState } from '../../types';
import React from 'react';
import { render } from 'react-dom';

const RockEntries = () => {
    const [location, setLocation] = useState<string[]>([]);
    const [description, setDescription] = useState<string[]>([]);
    const [name, setName] = useState<string[]>([]);
    const [entries, setEntries] = useState<JSX.Element[]>([]);
    const [formState, setFormState] = useState<FormState>({
        name: '',
        image: '',
        description: '',
        location: '',
      });
          

    useEffect(() => {
        // queries database, updates location, description, and name states
        fetch('http://localhost:3000/rocks').then((res) => {
          return res.json();
        }).then((data) => {
          console.log('data in use effect', data);
        }).catch((err) => {
          console.log('err in rock entries use effect', err);
        })
        setLocation([...location, 'home']);
        setDescription([...description, 'a rock']);
        setName([...name, 'no one']);
        // updates entries array
        const subArr: JSX.Element[] = [];
        for (let i = 0; i < name.length; i ++) {
            subArr.push(<RockEntry name = {name[i]} description = {description[i]} location = {location[i]}/>)
            setEntries([...entries, ...subArr]);
        }
    }, []);
    
    useEffect(() => {
        // when a change to the name arr is made, add one more new entry to entries array
        const index = name.length - 1;
        setEntries([...entries, <RockEntry name = {name[index]} description = {description[index]} location = {location[index]}/>]);
    }, [name]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // fetch request to put rock info into database
        // the fetch request recieves the rock id as a response
        setLocation([...location, formState.location]);
        setDescription([...description, formState.description]);
        setName([...name, formState.name]);
        clearForm();
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
          ...prevState,
          [name]: value
        }));
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