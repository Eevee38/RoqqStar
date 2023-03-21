// need this????

// import { useState } from 'react';
// import { FormState } from '../../types'

// interface InputFormProps {
//   formState: FormState;
// }

// const AddEntry = (props: InputFormProps) => {
//   const [formState, setFormState] = useState<FormState>(props.formState);
      
//         const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//           const { name, value } = event.target;
//           setFormState(prevState => ({
//             ...prevState,
//             [name]: value
//           }));
//         };
      
//         const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//           event.preventDefault();
//           console.log(formState);
          
//         };
      
//         return (
//           <form onSubmit={handleSubmit}>
//             <label>
//               Name:
//               <input type="text" name="name" value={formState.name} onChange={handleInputChange} />
//             </label>
//             <label>
//               Image:
//               <input type="text" name="image" value={formState.image} onChange={handleInputChange} />
//             </label>
//             <label>
//               Description:
//               <input type="text" name="description" value={formState.description} onChange={handleInputChange} />
//             </label>
//             <label>
//               Location:
//               <input type="text" name="location" value={formState.location} onChange={handleInputChange} />
//             </label>
//             <button type="submit">Submit</button>
//           </form>
//         );

// }

// export default AddEntry;