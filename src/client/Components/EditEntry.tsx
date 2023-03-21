import { ChangeEventHandler, useState } from 'react';
import  { FormState } from '../../types'
interface EditEntryProps {
    formState: FormState;
    entries: Array<FormState>
    editEntry: Function
    setFormState: Function
    id: number
  }

const EditEntry = (props: EditEntryProps) => {
    const [showElement, setShowElement] = useState(false);

    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = event.target;
    //     props.setFormState(prevState => ({
    //       ...prevState,
    //       [name]: value
    //     }));
    //   };

  function handleClick() {
    setShowElement(!showElement);
  }

// handleSubmit will be props.editEntry(props.id)

  // buggy currently
    return (
        <div>
            {/* <button onClick={() => handleClick()}>Edit Entry</button> 
            {showElement && <div>
                <form>
            <label>
              Name:
              <input type="text" name="name" value={props.formState.name} onChange={handleInputChange} />
            </label>
            <label>
              Image:
              <input type="text" name="image" value={props.formState.image} onChange={handleInputChange} />
            </label>
            <label>
              Description:
              <input type="text" name="description" value={props.formState.description} onChange={handleInputChange} />
            </label>
            <label>
              Location:
              <input type="text" name="location" value={props.formState.location} onChange={handleInputChange} />
            </label>
            <button type="submit">Submit</button>
          </form></div>} */}
        </div>
    )
}

export default EditEntry;