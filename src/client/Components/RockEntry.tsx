import { ChangeEventHandler, useState } from 'react'
import  { FormState } from '../../types'
import DeleteEntry from './DeleteEntry';
import EditEntry from './EditEntry';
interface RockEntryProps {
  formState: FormState;
  entries: Array<FormState>;
  deleteEntry: Function;
  editEntry: Function;
  setFormState: Function
  id: number
}

const RockEntry = (props: RockEntryProps) => {
  const { image, name, description, location } = props.formState;

    return (
    <div className="rockentry">
      <h2>{name}</h2>
      <img src={image} /> 
      <p>{description}</p>
      <p>{location}</p>
      <DeleteEntry {...props}/>
      <EditEntry {...props}/>
    </div>
    )
}

export default RockEntry;