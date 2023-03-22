import { useState, useEffect } from 'react';
import RockEntry from './RockEntry';
import { FormState } from '../../types';
import React from 'react';
import { render } from 'react-dom';

const RockEntries = () => {
  const [location, setLocation] = useState<string[]>([]);
  const [description, setDescription] = useState<string[]>([]);
  const [image, setImage] = useState<string[]>([]);
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
    fetch('http://localhost:8080/rock')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // iterate through data.rows
        //setLocation, setDescription, setName for each object
        const subArr: JSX.Element[] = [];
        for (const obj of data.rows) {
          subArr.push(
            <RockEntry
              name={obj.rock_name}
              image={obj.image}
              description={obj.description}
              location={obj.location}
            />
          );
          setEntries([...entries, ...subArr]);
        }
      })
      .catch((err) => {
        console.log('err in rock entries use effect', err);
      });
  }, []);

  useEffect(() => {
    // when a change to the name arr is made, add one more new entry to entries array
    const index = name.length - 1;
    setEntries([
      ...entries,
      <RockEntry
        name={name[index]}
        image={image[index]}
        description={description[index]}
        location={location[index]}
      />,
    ]);
  }, [name]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // fetch request to put rock info into database
    // the fetch request recieves the rock id as a response

    fetch('http://localhost:8080/rock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formState.name,
        image: formState.image,
        description: formState.description,
        location: formState.location,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('data in 80', data.data.rows[0]);
        setLocation([...location, data.data.rows[0].location]);
        setDescription([...description, data.data.rows[0].description]);
        setImage([...image, data.data.rows[0].image]);
        setName([...name, data.data.rows[0].rock_name]);
        clearForm();
      })
      .catch((error) => {
        console.log('err', error);
      });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setFormState({
      name: '',
      image: '',
      description: '',
      location: '',
    });
  };

  return (
    <div id="rockentries">
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Image:
            <input
              type="text"
              name="image"
              value={formState.image}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formState.description}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formState.location}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>{entries}</div>
    </div>
  );
};

export default RockEntries;
