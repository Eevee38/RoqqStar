import  { FormState } from '../../types'
import { useEffect } from 'react'
interface DeleteEntryProps {
    formState: FormState;
    entries: Array<FormState>
    deleteEntry: Function
  }

const DeleteEntry = (props: DeleteEntryProps) => {
    

    return (
        <div>
           <button onClick={() => props.deleteEntry()}>Delete Rock</button> 
        </div>
    )
}

export default DeleteEntry;