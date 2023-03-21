import { useState, useEffect } from 'react';
import RockEntry from './RockEntry';
import  { FormState } from '../../types'


const RockEntries = () => {
  const [entries, setEntries] = useState([])
  let [key, setKey] = useState(0);
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
    entries.push(<RockEntry key={key} editEntry={editEntry} deleteEntry={deleteEntry} entries={entries} formState={formState} />);
    setKey(key += 1); 
    setEntries( [...entries]);
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

  const deleteEntry = ():void => {
    for (let entry of entries) {
      console.log('entries in delete', entry)
    }
}

const editEntry = ():void => {
  for (let entry of entries) {
    console.log('entries in edit', entry)
  }
}
  useEffect(() => {
    console.log('entries in RockEntries', entries)
  }, [entries]);
      
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