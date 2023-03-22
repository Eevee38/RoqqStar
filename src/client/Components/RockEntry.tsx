import { ChangeEventHandler, useState } from 'react'
import  { FormState } from '../../types'
import DeleteEntry from './DeleteEntry';
import EditEntry from './EditEntry';
// interface RockEntryProps {
//   formState: FormState;
//   entries: Array<FormState>;
//   deleteEntry: Function;
//   editEntry: Function;
//   setFormState: Function
//   id: number
// }

interface RockEntryProps {
  name: string;
  description: string;
  location: string;
}

// const RockEntry = (props: RockEntryProps) => {
//   const { image, name, description, location } = props.formState;

//     return (
//     <div className="rockentry">
//       <h2>{name}</h2>
//       <img src={image} /> 
//       <p>{description}</p>
//       <p>{location}</p>
//       <DeleteEntry {...props}/>
//       <EditEntry {...props}/>
//     </div>
//     )
// }

const RockEntry = (props: RockEntryProps) => {
  const { name, description, location } = props;
  return (
    <div className='rockentry'>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>{location}</p>
    </div>
  )
}

export default RockEntry;