import { useState } from 'react'
import  { FormState } from '../../types'
interface RockEntryProps {
  formState: FormState;
}
const RockEntry = (props: RockEntryProps) => {
  const { image, name, description, location } = props.formState;

    return (
    <div>
      <h2>{name}</h2>
      <img src={image} /> 
      <p>{description}</p>
      <p>{location}</p>
    </div>
    )
}

export default RockEntry;