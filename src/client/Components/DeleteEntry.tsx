import  { FormState } from '../../types'
import { useEffect } from 'react'
interface DeleteEntryProps {
    formState: FormState;
    entries: Array<FormState>
    id: number
    deleteEntry: Function
  }

const DeleteEntry = (props: DeleteEntryProps) => {

    return (
        <div>
           <button onClick={() => props.deleteEntry(props.id)}>Delete Rock</button> 
        </div>
    )
}

export default DeleteEntry;