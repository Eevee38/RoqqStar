import  { FormState } from '../../types'
interface EditEntryProps {
    formState: FormState;
    entries: Array<FormState>
    editEntry: Function
  }

const EditEntry = (props: EditEntryProps) => {
    return (
        <div>
            <button onClick={() => props.editEntry()}>Edit Entry</button> 
        </div>
    )
}

export default EditEntry;